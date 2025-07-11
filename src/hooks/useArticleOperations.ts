import { useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Article, AppState } from "@/types/article";

export function useArticleOperations(
  appState: AppState,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
) {
  const { toast } = useToast();

  // Filter articles based on current filter settings
  const filteredArticles = useMemo(() => {
    if (!appState.currentBatch) return [];
    
    return appState.currentBatch.articles.filter(article => {
      // Confidence filter
      if (appState.filterSettings.confidence !== 'all') {
        const confidence = article.confidence;
        switch (appState.filterSettings.confidence) {
          case 'high':
            if (confidence < 0.7) return false;
            break;
          case 'medium':
            if (confidence < 0.4 || confidence >= 0.7) return false;
            break;
          case 'low':
            if (confidence >= 0.4) return false;
            break;
        }
      }
      
      // Status filter
      if (appState.filterSettings.status !== 'all') {
        if (article.status !== appState.filterSettings.status) return false;
      }
      
      // Source filter
      if (appState.filterSettings.source !== 'all') {
        if (article.source !== appState.filterSettings.source) return false;
      }
      
      return true;
    });
  }, [appState.currentBatch, appState.filterSettings]);

  // Sort articles by confidence (highest first)
  const sortedArticles = useMemo(() => {
    return [...filteredArticles].sort((a, b) => b.confidence - a.confidence);
  }, [filteredArticles]);

  const handleStatusChange = (articleId: string, status: Article['status']) => {
    if (!appState.currentBatch) return;
    
    setAppState(prev => ({
      ...prev,
      currentBatch: {
        ...prev.currentBatch!,
        articles: prev.currentBatch!.articles.map(article =>
          article.id === articleId ? { ...article, status } : article
        )
      }
    }));

    // Show toast notification
    const statusMessages = {
      approved: "Article approved for newsletter",
      rejected: "Article rejected",
      saved: "Article saved for later review",
      pending: "Article moved back to pending"
    };
    
    toast({
      title: "Status Updated",
      description: statusMessages[status],
      duration: 2000,
    });
  };

  const handlePOVEdit = (articleId: string, newPOV: string) => {
    if (!appState.currentBatch) return;
    
    setAppState(prev => ({
      ...prev,
      currentBatch: {
        ...prev.currentBatch!,
        articles: prev.currentBatch!.articles.map(article =>
          article.id === articleId 
            ? { 
                ...article, 
                proposedPOV: newPOV,
                userModifications: {
                  originalPOV: article.proposedPOV,
                  editedPOV: newPOV,
                  editTimestamp: Date.now()
                }
              }
            : article
        )
      }
    }));

    toast({
      title: "POV Updated",
      description: "LatchKey POV has been modified",
      duration: 2000,
    });
  };

  return {
    filteredArticles,
    sortedArticles,
    handleStatusChange,
    handlePOVEdit
  };
}