export declare class CVAnalysisService {
    private openai;
    constructor();
    extractTextFromPDF(filePath: string): Promise<string>;
    extractTextFromDOCX(filePath: string): Promise<string>;
    extractText(filePath: string, mimeType: string): Promise<string>;
    analyzeCV(cvText: string, jobDescription?: string): Promise<{
        matchScore: number;
        skills: string[];
        experience: string;
        extractedData: any;
    }>;
    private analyzeWithOpenAI;
    private analyzeBasic;
    private extractSkills;
    private extractExperience;
    private calculateMatchScore;
}
//# sourceMappingURL=cv-analysis.service.d.ts.map