import { useState, useEffect } from "react";
import { AppState, FilterState } from "@/types/article";
import { mockBatch } from "@/data/mockBatch";

export function useDashboardState() {
  const [appState, setAppState] = useState<AppState>({
    currentBatch: mockBatch,
    selectedArticles: [],
    filterSettings: {
      confidence: 'all',
      status: 'all',
      source: 'all'
    },
    agentStatus: {
      crewAI: 'online',
      newsletterAssembly: 'ready'
    },
    povQualityEnabled: true,
    latchkeyVoiceAnalysisEnabled: true,
    previewPanelOpen: false
  });

  const [currentView, setCurrentView] = useState<'grid' | 'focus'>('focus');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const handleFilterChange = (filters: FilterState) => {
    setAppState(prev => ({
      ...prev,
      filterSettings: filters
    }));
  };

  const handleTogglePOVQuality = (enabled: boolean) => {
    setAppState(prev => ({
      ...prev,
      povQualityEnabled: enabled
    }));
  };

  const handleToggleLatchkeyAnalysis = (enabled: boolean) => {
    setAppState(prev => ({
      ...prev,
      latchkeyVoiceAnalysisEnabled: enabled
    }));
  };

  const handleViewToggle = (view: 'grid' | 'focus') => {
    setCurrentView(view);
  };

  const handleArticleSelect = (articleId: string) => {
    setSelectedArticleId(articleId);
  };

  return {
    appState,
    setAppState,
    currentView,
    selectedArticleId,
    setSelectedArticleId,
    handleFilterChange,
    handleTogglePOVQuality,
    handleToggleLatchkeyAnalysis,
    handleViewToggle,
    handleArticleSelect
  };
}