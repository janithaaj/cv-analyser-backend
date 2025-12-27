# Auto Status Update Based on Match Score

## Overview

The system now automatically updates candidate status based on their CV match score when a CV is analyzed.

## How It Works

When a CV is analyzed and a match score is calculated, the candidate's status is automatically updated according to these rules:

### Status Update Rules

| Match Score | Status Update | Description |
|-------------|---------------|-------------|
| **≥ 80%** | `NEW` → `SHORTLISTED` | High match - automatically shortlisted |
| **50-79%** | Stays `NEW` | Medium match - requires manual review |
| **< 50%** | `NEW` → `REJECTED` | Low match - automatically rejected |

### Important Notes

1. **Only updates if status is `NEW`**: The auto-update only works if the candidate's current status is `NEW`. This prevents overwriting manual status changes.

2. **Preserves manual changes**: If you've manually changed a candidate's status (e.g., to `INTERVIEWED` or `HIRED`), the auto-update will NOT change it.

3. **Requires CV analysis**: Status is only auto-updated when:
   - A CV is uploaded and analyzed
   - The analysis includes a job description (for match score calculation)
   - The match score is calculated successfully

## Example Scenarios

### Scenario 1: High Match Score
- Candidate has `NEW` status
- CV analyzed with 85% match score
- **Result**: Status automatically changes to `SHORTLISTED`

### Scenario 2: Medium Match Score
- Candidate has `NEW` status
- CV analyzed with 73% match score
- **Result**: Status stays `NEW` (requires manual review)

### Scenario 3: Low Match Score
- Candidate has `NEW` status
- CV analyzed with 35% match score
- **Result**: Status automatically changes to `REJECTED`

### Scenario 4: Already Shortlisted
- Candidate has `SHORTLISTED` status
- CV re-analyzed with 90% match score
- **Result**: Status remains `SHORTLISTED` (not changed because it's not `NEW`)

## Customizing Thresholds

To change the thresholds, edit `src/services/cvs.service.ts`:

```typescript
// Current thresholds
if (analysis.matchScore >= 80) {
  candidate.status = 'SHORTLISTED';
} else if (analysis.matchScore < 50) {
  candidate.status = 'REJECTED';
}
```

**Example: More strict auto-shortlist (90%+)**
```typescript
if (analysis.matchScore >= 90) {
  candidate.status = 'SHORTLISTED';
} else if (analysis.matchScore < 60) {
  candidate.status = 'REJECTED';
}
```

**Example: More lenient auto-shortlist (70%+)**
```typescript
if (analysis.matchScore >= 70) {
  candidate.status = 'SHORTLISTED';
} else if (analysis.matchScore < 40) {
  candidate.status = 'REJECTED';
}
```

## Manual Override

You can always manually change a candidate's status regardless of match score:

```bash
PUT /api/candidates/:id
{
  "status": "SHORTLISTED"  // or any other status
}
```

## Status Flow

```
NEW (default)
  ↓
[CV Analyzed]
  ↓
  ├─ Match ≥ 80% → SHORTLISTED (auto)
  ├─ Match 50-79% → NEW (stays for review)
  └─ Match < 50% → REJECTED (auto)
  
SHORTLISTED → INTERVIEWED → OFFERED → HIRED (manual)
SHORTLISTED → REJECTED (manual)
```

## Benefits

1. **Saves time**: High-scoring candidates are automatically shortlisted
2. **Filters low matches**: Low-scoring candidates are automatically rejected
3. **Preserves control**: Medium scores require manual review
4. **Respects decisions**: Manual status changes are never overwritten

## Testing

1. Upload a CV for a candidate
2. Analyze the CV with a job description
3. Check the candidate's status:
   - If match score ≥ 80% → Should be `SHORTLISTED`
   - If match score 50-79% → Should be `NEW`
   - If match score < 50% → Should be `REJECTED`

## Troubleshooting

**Q: Why is my candidate still `NEW` with 85% match?**
A: Check if:
- The CV was analyzed with a job description (match score needs job description)
- The candidate status was already changed manually
- The analysis completed successfully

**Q: Can I disable auto-update?**
A: Yes, comment out the status update logic in `cvs.service.ts` lines 127-140

**Q: What if I want different thresholds?**
A: Edit the thresholds in `src/services/cvs.service.ts` as shown above

