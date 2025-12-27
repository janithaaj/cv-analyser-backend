"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CVAnalysisService = void 0;
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const mammoth_1 = __importDefault(require("mammoth"));
const fs_1 = __importDefault(require("fs"));
const openai_1 = __importDefault(require("openai"));
const env_1 = require("../config/env");
class CVAnalysisService {
    constructor() {
        this.openai = null;
        // Initialize OpenAI if API key is provided
        if (env_1.env.OPENAI_API_KEY) {
            this.openai = new openai_1.default({
                apiKey: env_1.env.OPENAI_API_KEY,
            });
        }
    }
    async extractTextFromPDF(filePath) {
        const dataBuffer = fs_1.default.readFileSync(filePath);
        const data = await (0, pdf_parse_1.default)(dataBuffer);
        return data.text;
    }
    async extractTextFromDOCX(filePath) {
        const result = await mammoth_1.default.extractRawText({ path: filePath });
        return result.value;
    }
    async extractText(filePath, mimeType) {
        if (mimeType === 'application/pdf') {
            return this.extractTextFromPDF(filePath);
        }
        else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            mimeType === 'application/msword') {
            return this.extractTextFromDOCX(filePath);
        }
        throw new Error('Unsupported file type');
    }
    async analyzeCV(cvText, jobDescription) {
        // Use OpenAI if available and job description is provided, otherwise use basic extraction
        if (this.openai && jobDescription) {
            return this.analyzeWithOpenAI(cvText, jobDescription);
        }
        else {
            return this.analyzeBasic(cvText, jobDescription);
        }
    }
    async analyzeWithOpenAI(cvText, jobDescription) {
        if (!this.openai) {
            throw new Error('OpenAI client not initialized');
        }
        try {
            // Truncate text to stay within token limits
            const maxCVLength = 8000;
            const maxJobLength = 4000;
            const truncatedCV = cvText.length > maxCVLength
                ? cvText.substring(0, maxCVLength) + '...'
                : cvText;
            const truncatedJob = jobDescription.length > maxJobLength
                ? jobDescription.substring(0, maxJobLength) + '...'
                : jobDescription;
            const prompt = `Analyze this CV and job description. Extract the following information in JSON format:
{
  "skills": ["skill1", "skill2", ...],
  "experience": "X years" or "Not specified",
  "education": "degree information",
  "matchScore": 0-100,
  "summary": "brief candidate summary",
  "strengths": ["strength1", "strength2", ...],
  "recommendations": "recommendation text"
}

CV Text:
${truncatedCV}

Job Description:
${truncatedJob}

Return ONLY valid JSON, no additional text.`;
            const completion = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini', // Using gpt-4o-mini for cost efficiency, can change to 'gpt-4' for better results
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert HR analyst. Extract structured data from CVs and calculate match scores. Always return valid JSON.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.3,
                max_tokens: 2000,
                response_format: { type: 'json_object' }
            });
            const responseText = completion.choices[0]?.message?.content || '{}';
            const analysis = JSON.parse(responseText);
            return {
                matchScore: analysis.matchScore || 0,
                skills: analysis.skills || [],
                experience: analysis.experience || 'Not specified',
                extractedData: {
                    text: cvText,
                    skills: analysis.skills || [],
                    experience: analysis.experience || 'Not specified',
                    education: analysis.education || 'Not specified',
                    summary: analysis.summary || '',
                    strengths: analysis.strengths || [],
                    recommendations: analysis.recommendations || '',
                    matchScore: analysis.matchScore || 0
                }
            };
        }
        catch (error) {
            console.error('OpenAI analysis error:', error);
            // Fallback to basic analysis if OpenAI fails
            return this.analyzeBasic(cvText, jobDescription);
        }
    }
    analyzeBasic(cvText, jobDescription) {
        // Original basic extraction logic
        const skills = this.extractSkills(cvText);
        const experience = this.extractExperience(cvText);
        const matchScore = jobDescription
            ? this.calculateMatchScore(cvText, jobDescription, skills)
            : 0;
        return {
            matchScore,
            skills,
            experience,
            extractedData: {
                text: cvText,
                skills,
                experience
            }
        };
    }
    extractSkills(text) {
        // Implement skill extraction logic
        // Can use NLP libraries or keyword matching
        const commonSkills = [
            'React', 'Node.js', 'TypeScript', 'Python', 'Java',
            'JavaScript', 'AWS', 'Docker', 'Kubernetes', 'MongoDB',
            'PostgreSQL', 'Express', 'Next.js', 'Angular', 'Vue',
            'Git', 'CI/CD', 'REST API', 'GraphQL', 'Microservices',
            'SQL', 'NoSQL', 'Redis', 'Elasticsearch', 'Linux'
        ];
        const foundSkills = [];
        const lowerText = text.toLowerCase();
        commonSkills.forEach(skill => {
            if (lowerText.includes(skill.toLowerCase())) {
                foundSkills.push(skill);
            }
        });
        return foundSkills;
    }
    extractExperience(text) {
        // Extract years of experience from CV
        const experienceRegex = /(\d+)\+?\s*(years?|yrs?)\s*(of\s*)?experience/i;
        const match = text.match(experienceRegex);
        return match ? `${match[1]} years` : 'Not specified';
    }
    calculateMatchScore(cvText, jobDescription, skills) {
        // Simple scoring algorithm
        // Can be enhanced with ML/AI
        let score = 0;
        // Skill matching (40 points)
        const jobSkills = this.extractSkills(jobDescription);
        if (jobSkills.length > 0) {
            const matchedSkills = skills.filter(skill => jobSkills.some(js => js.toLowerCase() === skill.toLowerCase()));
            score += (matchedSkills.length / jobSkills.length) * 40;
        }
        // Keyword matching (30 points)
        const jobKeywords = jobDescription.toLowerCase().split(/\s+/).filter(kw => kw.length > 3);
        const cvKeywords = cvText.toLowerCase().split(/\s+/).filter(kw => kw.length > 3);
        const matchedKeywords = jobKeywords.filter(kw => cvKeywords.includes(kw));
        if (jobKeywords.length > 0) {
            score += (matchedKeywords.length / jobKeywords.length) * 30;
        }
        // Experience matching (30 points)
        // Add logic based on required vs actual experience
        score += 30; // Placeholder
        return Math.round(Math.min(score, 100));
    }
}
exports.CVAnalysisService = CVAnalysisService;
//# sourceMappingURL=cv-analysis.service.js.map