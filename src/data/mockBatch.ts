import { BatchData, Article } from "@/types/article";

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "New AI Assistant Helps Managers Make Better Decisions",
    source: "Harvard Business Review",
    url: "https://hbr.org/example",
    confidence: 0.85,
    genXScore: 85,
    powerLoaderFit: "HIGH",
    proposedPOV: "How AI becomes your professional power-loader: amplifying expertise without replacing judgment",
    painPoints: ["being replaced vs amplified", "keeping control while gaining efficiency"],
    suggestedHeadlines: [
      "Your New Professional Power-Loader",
      "Finally, AI That Gets How You Work",
      "The Tool That Makes You 4x More Effective"
    ],
    fullAnalysis: "This article discusses how AI can augment human decision-making...",
    status: "pending",
    povQuality: {
      score: 8.5,
      issues: [],
      genXHookDetected: true,
      characterCount: 92,
      toneMatch: true
    },
    powerLoaderAnalysis: {
      humanContribution: "Strategic judgment, experience",
      aiContribution: "Research aggregation, pattern analysis",
      resultMultiplier: "4x productivity with expertise",
      collaborationQuality: "HIGH"
    },
    latchkeyVoiceScore: {
      overallScore: 8.5,
      elements: {
        confidentGroundedTone: true,
        colleagueApproach: true,
        parentheticalHonesty: true,
        avoidHypeLanguage: true,
        threeElementList: false,
        buildToRevelation: true,
        genXCulturalRef: false
      },
      patterns: {
        communicationFirst: true,
        powerLoaderMetaphor: "Strong",
        figureItOutEthos: true,
        pragmaticSkepticism: true,
        experienceValidation: "Strong"
      },
      suggestions: [
        "Consider adding a three-element list structure",
        "Could benefit from a Gen X cultural reference"
      ]
    },
    processingTimestamp: Date.now() - 1000000
  },
  {
    id: "2",
    title: "Remote Work Revolution: Companies Embrace Permanent Flexibility",
    source: "Wall Street Journal",
    url: "https://wsj.com/example",
    confidence: 0.72,
    genXScore: 78,
    powerLoaderFit: "MEDIUM",
    proposedPOV: "Gen X figured out work-life balance before it was cool—now everyone's catching up to what we've known all along",
    painPoints: ["proving remote work effectiveness", "management resistance to change"],
    suggestedHeadlines: [
      "We Told You So: The Remote Work Vindication",
      "Gen X Wins Again: Remote Work Goes Mainstream",
      "Finally, Work That Works for Adults"
    ],
    fullAnalysis: "Analysis of the shift to permanent remote work policies...",
    status: "pending",
    povQuality: {
      score: 7.8,
      issues: ["Could be more specific about Gen X advantages"],
      genXHookDetected: true,
      characterCount: 118,
      toneMatch: true
    },
    powerLoaderAnalysis: {
      humanContribution: "Experience with balance, skepticism of fads",
      aiContribution: "Trend analysis, data validation",
      resultMultiplier: "2x validation confidence",
      collaborationQuality: "MEDIUM"
    },
    latchkeyVoiceScore: {
      overallScore: 7.2,
      elements: {
        confidentGroundedTone: true,
        colleagueApproach: true,
        parentheticalHonesty: false,
        avoidHypeLanguage: true,
        threeElementList: false,
        buildToRevelation: true,
        genXCulturalRef: true
      },
      patterns: {
        communicationFirst: true,
        powerLoaderMetaphor: "Weak",
        figureItOutEthos: true,
        pragmaticSkepticism: true,
        experienceValidation: "Strong"
      },
      suggestions: [
        "Add parenthetical honesty pattern",
        "Strengthen power-loader metaphor connection"
      ]
    },
    processingTimestamp: Date.now() - 800000
  },
  {
    id: "3",
    title: "Cryptocurrency Market Shows Signs of Institutional Adoption",
    source: "TechCrunch",
    url: "https://techcrunch.com/example",
    confidence: 0.45,
    genXScore: 42,
    powerLoaderFit: "LOW",
    proposedPOV: "Crypto finally grows up: from get-rich-quick schemes to actual business tools (took long enough)",
    painPoints: ["separating hype from utility", "regulatory uncertainty"],
    suggestedHeadlines: [
      "Crypto Gets Serious (Finally)",
      "From Moonshots to Business Tools",
      "The Crypto Maturation Nobody Asked For"
    ],
    fullAnalysis: "Examination of crypto's evolution toward institutional use...",
    status: "pending",
    povQuality: {
      score: 6.2,
      issues: ["Tone could be more professional", "Length optimization needed"],
      genXHookDetected: false,
      characterCount: 101,
      toneMatch: false
    },
    powerLoaderAnalysis: {
      humanContribution: "Skeptical evaluation, risk assessment",
      aiContribution: "Market data, trend tracking",
      resultMultiplier: "1.5x due diligence",
      collaborationQuality: "LOW"
    },
    latchkeyVoiceScore: {
      overallScore: 5.8,
      elements: {
        confidentGroundedTone: false,
        colleagueApproach: true,
        parentheticalHonesty: true,
        avoidHypeLanguage: true,
        threeElementList: false,
        buildToRevelation: false,
        genXCulturalRef: false
      },
      patterns: {
        communicationFirst: false,
        powerLoaderMetaphor: "Missing",
        figureItOutEthos: true,
        pragmaticSkepticism: true,
        experienceValidation: "Weak"
      },
      suggestions: [
        "Strengthen confident, grounded tone",
        "Add power-loader framework",
        "Improve revelation structure"
      ]
    },
    processingTimestamp: Date.now() - 600000
  },
  {
    id: "4",
    title: "Four-Day Work Week Trials Show Productivity Gains",
    source: "Fast Company",
    url: "https://fastcompany.com/example",
    confidence: 0.78,
    genXScore: 88,
    powerLoaderFit: "HIGH",
    proposedPOV: "The four-day week isn't about working less—it's about working like we actually understand how productivity works",
    painPoints: ["convincing old-school management", "maintaining client expectations"],
    suggestedHeadlines: [
      "Working Smarter Finally Beats Working Harder",
      "The Schedule Gen X Always Wanted",
      "Productivity 101: Quality Over Quantity"
    ],
    fullAnalysis: "Research on four-day work week implementations...",
    status: "approved",
    povQuality: {
      score: 9.1,
      issues: [],
      genXHookDetected: true,
      characterCount: 124,
      toneMatch: true
    },
    powerLoaderAnalysis: {
      humanContribution: "Understanding of sustainable productivity",
      aiContribution: "Performance metrics, scheduling optimization",
      resultMultiplier: "3x sustainable output",
      collaborationQuality: "HIGH"
    },
    latchkeyVoiceScore: {
      overallScore: 8.9,
      elements: {
        confidentGroundedTone: true,
        colleagueApproach: true,
        parentheticalHonesty: false,
        avoidHypeLanguage: true,
        threeElementList: false,
        buildToRevelation: true,
        genXCulturalRef: true
      },
      patterns: {
        communicationFirst: true,
        powerLoaderMetaphor: "Strong",
        figureItOutEthos: true,
        pragmaticSkepticism: true,
        experienceValidation: "Strong"
      },
      suggestions: [
        "Consider adding parenthetical aside for authenticity"
      ]
    },
    processingTimestamp: Date.now() - 400000
  },
  {
    id: "5",
    title: "Enterprise Software Vendors Struggle with AI Integration",
    source: "Information Week",
    url: "https://informationweek.com/example",
    confidence: 0.68,
    genXScore: 75,
    powerLoaderFit: "MEDIUM",
    proposedPOV: "Enterprise software finally admits what we knew: bolting AI onto legacy systems is like putting racing stripes on a minivan",
    painPoints: ["integration complexity", "vendor lock-in concerns"],
    suggestedHeadlines: [
      "AI Meets Legacy: The Integration Reality Check",
      "When Enterprise Software Gets Too Clever",
      "The AI Retrofit Nobody Asked For"
    ],
    fullAnalysis: "Analysis of enterprise AI integration challenges...",
    status: "saved",
    povQuality: {
      score: 7.5,
      issues: ["Could strengthen the professional tone"],
      genXHookDetected: true,
      characterCount: 137,
      toneMatch: true
    },
    powerLoaderAnalysis: {
      humanContribution: "System integration expertise, vendor evaluation",
      aiContribution: "Compatibility analysis, performance prediction",
      resultMultiplier: "2.5x implementation success",
      collaborationQuality: "MEDIUM"
    },
    latchkeyVoiceScore: {
      overallScore: 7.6,
      elements: {
        confidentGroundedTone: true,
        colleagueApproach: true,
        parentheticalHonesty: false,
        avoidHypeLanguage: true,
        threeElementList: false,
        buildToRevelation: true,
        genXCulturalRef: true
      },
      patterns: {
        communicationFirst: true,
        powerLoaderMetaphor: "Weak",
        figureItOutEthos: true,
        pragmaticSkepticism: true,
        experienceValidation: "Strong"
      },
      suggestions: [
        "Enhance power-loader metaphor integration",
        "Add parenthetical honesty pattern"
      ]
    },
    processingTimestamp: Date.now() - 200000
  }
];

export const mockBatch: BatchData = {
  id: "batch-2024-12-15",
  timestamp: Date.now(),
  source: "CrewAI",
  articles: mockArticles,
  processingStats: {
    totalProcessed: 5,
    highConfidence: 2,
    mediumConfidence: 2,
    lowConfidence: 1,
    avgLatchkeyVoiceScore: 7.6,
    powerLoaderAlignment: 84
  },
  errors: []
};