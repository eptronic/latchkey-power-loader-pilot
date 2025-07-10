export interface LatchKeyVoiceScore {
  overallScore: number; // 0-10
  elements: {
    confidentGroundedTone: boolean;
    colleagueApproach: boolean;
    parentheticalHonesty: boolean;
    avoidHypeLanguage: boolean;
    threeElementList: boolean;
    buildToRevelation: boolean;
    genXCulturalRef: boolean;
  };
  patterns: {
    communicationFirst: boolean;
    powerLoaderMetaphor: 'Strong' | 'Weak' | 'Missing';
    figureItOutEthos: boolean;
    pragmaticSkepticism: boolean;
    experienceValidation: 'Strong' | 'Weak' | 'Missing';
  };
  suggestions: string[];
}

export interface PowerLoaderAnalysis {
  humanContribution: string;
  aiContribution: string;
  resultMultiplier: string;
  collaborationQuality: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface POVQuality {
  score: number;
  issues: string[];
  genXHookDetected: boolean;
  characterCount: number;
  toneMatch: boolean;
}

export interface Article {
  id: string;
  title: string;
  source: string;
  url: string;
  confidence: number;
  genXScore: number;
  powerLoaderFit: 'HIGH' | 'MEDIUM' | 'LOW';
  proposedPOV: string;
  painPoints: string[];
  suggestedHeadlines: string[];
  fullAnalysis: string;
  status: 'pending' | 'approved' | 'rejected' | 'saved';
  
  povQuality?: POVQuality;
  powerLoaderAnalysis: PowerLoaderAnalysis;
  latchkeyVoiceScore: LatchKeyVoiceScore;
  
  processingTimestamp: number;
  userModifications?: {
    originalPOV: string;
    editedPOV: string;
    editTimestamp: number;
  };
}

export interface BatchData {
  id: string;
  timestamp: number;
  source: 'CrewAI' | 'Manual';
  articles: Article[];
  processingStats: {
    totalProcessed: number;
    highConfidence: number;
    mediumConfidence: number;
    lowConfidence: number;
    avgLatchkeyVoiceScore: number;
    powerLoaderAlignment: number;
  };
  errors?: string[];
}

export interface FilterState {
  confidence: 'all' | 'high' | 'medium' | 'low';
  status: 'all' | 'pending' | 'approved' | 'rejected' | 'saved';
  source: 'all' | string;
}

export interface AppState {
  currentBatch: BatchData | null;
  selectedArticles: string[];
  filterSettings: FilterState;
  agentStatus: {
    crewAI: 'online' | 'offline' | 'processing';
    newsletterAssembly: 'ready' | 'busy' | 'error';
  };
  povQualityEnabled: boolean;
  latchkeyVoiceAnalysisEnabled: boolean;
  previewPanelOpen: boolean;
}