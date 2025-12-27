# OpenAI Integration Setup Guide

## ✅ What's Been Done

1. ✅ OpenAI package installed
2. ✅ CV Analysis Service updated with OpenAI integration
3. ✅ Fallback to basic analysis if OpenAI fails
4. ✅ Enhanced data extraction (education, summary, strengths, recommendations)

## 📝 Next Steps

### Step 1: Add Your OpenAI API Key

Add your OpenAI API key to your `.env` file:

```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

**Important:** 
- Never commit your API key to version control
- The `.env` file is already in `.gitignore`
- Get your API key from: https://platform.openai.com/api-keys

### Step 2: Restart Your Server

After adding the API key, restart your backend server:

```bash
npm run build
npm run dev
```

## 🚀 How It Works

### Automatic Detection
- If `OPENAI_API_KEY` is set → Uses OpenAI for analysis
- If `OPENAI_API_KEY` is not set → Uses basic keyword matching
- If OpenAI fails → Automatically falls back to basic analysis

### When OpenAI is Used
- **Requires:** Both CV text AND job description
- **Model:** `gpt-4o-mini` (cost-efficient, can be changed to `gpt-4`)
- **Returns:** Enhanced analysis with:
  - Skills (AI-extracted, more comprehensive)
  - Experience
  - Education details
  - Match score (0-100)
  - Candidate summary
  - Strengths
  - Recommendations

### When Basic Analysis is Used
- **Triggered:** No API key, no job description, or OpenAI error
- **Returns:** Basic analysis with:
  - Skills (predefined list matching)
  - Experience (regex extraction)
  - Match score (keyword/skill matching)

## 📊 Enhanced Analysis Output

When using OpenAI, the `analysisData` includes:

```json
{
  "text": "Full CV text...",
  "skills": ["React", "Node.js", "TypeScript", ...],
  "experience": "5 years",
  "education": "Bachelor's in Computer Science",
  "summary": "Experienced software engineer with...",
  "strengths": ["Strong problem-solving", "Team leadership", ...],
  "recommendations": "Highly recommended for senior positions...",
  "matchScore": 85
}
```

## 💰 Cost Considerations

- **Model:** `gpt-4o-mini` (cheaper option)
- **Average cost:** ~$0.001-0.003 per CV analysis
- **Monitor usage:** https://platform.openai.com/usage
- **Change model:** Edit `cv-analysis.service.ts` line with `model: 'gpt-4o-mini'`

## 🧪 Testing

### Test with OpenAI:
1. Add API key to `.env`
2. Upload a CV with a `jobId`:
   ```bash
   POST /api/cvs/upload
   FormData: { cv: <file>, candidateId: "...", jobId: "..." }
   ```
3. Analyze the CV:
   ```bash
   POST /api/cvs/:id/analyze
   ```
4. Check results:
   ```bash
   GET /api/cvs/:id
   ```

### Test without OpenAI:
- Simply don't add the API key
- System will use basic analysis automatically

## 🔧 Configuration

### Change OpenAI Model

Edit `src/services/cv-analysis.service.ts`:

```typescript
// Line ~95: Change model
model: 'gpt-4o-mini',  // Current (cheaper)
// To:
model: 'gpt-4',        // Better results, more expensive
```

### Adjust Token Limits

Edit `src/services/cv-analysis.service.ts`:

```typescript
// Line ~70-71: Adjust text truncation
const maxCVLength = 8000;      // Current
const maxJobLength = 4000;     // Current
```

## 🛡️ Error Handling

The system is designed to be resilient:
- ✅ If OpenAI API fails → Falls back to basic analysis
- ✅ If API key is invalid → Falls back to basic analysis
- ✅ If rate limited → Falls back to basic analysis
- ✅ Always returns results (never fails completely)

## 📝 Example Usage

```typescript
// Upload CV with jobId
const uploadResponse = await api.post('/api/cvs/upload', formData, {
  params: { candidateId: '...', jobId: '...' }
});

// Analyze (will use OpenAI if key is set)
const analyzeResponse = await api.post(
  `/api/cvs/${uploadResponse.data.data._id}/analyze`
);

// Get enhanced results
const cv = analyzeResponse.data.data;
console.log(cv.matchScore);           // AI-calculated score
console.log(cv.analysisData.skills);  // AI-extracted skills
console.log(cv.analysisData.summary); // Candidate summary
console.log(cv.analysisData.strengths); // Strengths array
```

## ✅ Status

- [x] OpenAI package installed
- [x] Service updated with OpenAI integration
- [x] Fallback mechanism implemented
- [ ] API key added to `.env` (you need to do this)
- [ ] Server restarted (do this after adding key)

## 🎯 Benefits

1. **Better Skill Detection** - Finds skills beyond predefined list
2. **Smarter Matching** - Context-aware match scoring
3. **Rich Insights** - Education, summary, strengths, recommendations
4. **Reliable** - Always works, even if OpenAI fails

