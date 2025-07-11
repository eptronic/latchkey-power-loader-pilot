import { useState, useMemo, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ArticleCard } from "./ArticleCard";
import { ArticleList } from "./ArticleList";
import { useToast } from "@/hooks/use-toast";
import { Article, BatchData, FilterState, AppState } from "@/types/article";
import { mockBatch } from "@/data/mockBatch";

export function Dashboard() {
  const { toast } = useToast();
  
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

  const handleRefreshFromCrewAI = () => {
    setAppState(prev => ({
      ...prev,
      agentStatus: { ...prev.agentStatus, crewAI: 'processing' }
    }));

    toast({
      title: "Refreshing from CrewAI",
      description: "Fetching latest articles...",
      duration: 2000,
    });

    // Simulate API call
    setTimeout(() => {
      setAppState(prev => ({
        ...prev,
        agentStatus: { ...prev.agentStatus, crewAI: 'online' }
      }));
      
      toast({
        title: "Sync Complete",
        description: "No new articles available",
        duration: 2000,
      });
    }, 2000);
  };

  const handleSyncToNewsletter = () => {
    if (!appState.currentBatch) return;
    
    const approvedArticles = appState.currentBatch.articles.filter(a => a.status === 'approved');
    
    if (approvedArticles.length === 0) {
      toast({
        title: "No Articles to Sync",
        description: "Please approve some articles first",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    setAppState(prev => ({
      ...prev,
      agentStatus: { ...prev.agentStatus, newsletterAssembly: 'busy' }
    }));

    toast({
      title: "Syncing to Newsletter",
      description: `Exporting ${approvedArticles.length} approved articles...`,
      duration: 2000,
    });

    // Simulate export
    setTimeout(() => {
      setAppState(prev => ({
        ...prev,
        agentStatus: { ...prev.agentStatus, newsletterAssembly: 'ready' }
      }));
      
      toast({
        title: "Export Complete",
        description: `Successfully exported ${approvedArticles.length} articles to Newsletter Assembly`,
        duration: 3000,
      });
    }, 2500);
  };

  const handleExportDecisions = () => {
    if (!appState.currentBatch) return;
    
    const decisions = appState.currentBatch.articles.map(article => ({
      id: article.id,
      title: article.title,
      status: article.status,
      originalPOV: article.proposedPOV,
      modifiedPOV: article.userModifications?.editedPOV,
      confidence: article.confidence,
      latchkeyVoiceScore: article.latchkeyVoiceScore.overallScore
    }));

    // Simulate file download
    const dataStr = JSON.stringify(decisions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `latchkey-decisions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    toast({
      title: "Decisions Exported",
      description: "Editorial decisions downloaded successfully",
      duration: 2000,
    });
  };

  const handleArchiveBatch = () => {
    toast({
      title: "Batch Archived",
      description: "Current batch has been archived",
      duration: 2000,
    });
  };

  const handleViewToggle = (view: 'grid' | 'focus') => {
    setCurrentView(view);
    if (view === 'focus' && sortedArticles.length > 0 && !selectedArticleId) {
      setSelectedArticleId(sortedArticles[0].id);
    }
  };

  const handleArticleSelect = (articleId: string) => {
    setSelectedArticleId(articleId);
  };

  // Get selected article for focus view
  const selectedArticle = selectedArticleId 
    ? sortedArticles.find(a => a.id === selectedArticleId) 
    : null;

  // Auto-select first article when switching to focus view or when articles change
  useEffect(() => {
    if (currentView === 'focus' && sortedArticles.length > 0 && !selectedArticleId) {
      setSelectedArticleId(sortedArticles[0].id);
    }
  }, [currentView, sortedArticles, selectedArticleId]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        currentBatch={appState.currentBatch}
        agentStatus={appState.agentStatus}
        currentView={currentView}
        onViewToggle={handleViewToggle}
        onRefreshFromCrewAI={handleRefreshFromCrewAI}
        onSyncToNewsletter={handleSyncToNewsletter}
      />
      
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar 
          currentBatch={appState.currentBatch}
          filterSettings={appState.filterSettings}
          povQualityEnabled={appState.povQualityEnabled}
          latchkeyVoiceAnalysisEnabled={appState.latchkeyVoiceAnalysisEnabled}
          onFilterChange={handleFilterChange}
          onTogglePOVQuality={handleTogglePOVQuality}
          onToggleLatchkeyAnalysis={handleToggleLatchkeyAnalysis}
          onExportDecisions={handleExportDecisions}
          onArchiveBatch={handleArchiveBatch}
        />
        
        <main className="flex-1 overflow-hidden">
          {sortedArticles.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2 text-muted-foreground">No Articles Found</h2>
                <p className="text-muted-foreground">
                  {appState.currentBatch ? "Try adjusting your filters" : "Load a batch to get started"}
                </p>
              </div>
            </div>
          ) : currentView === 'grid' ? (
            <div className="h-full overflow-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedArticles.map(article => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    povQualityEnabled={appState.povQualityEnabled}
                    latchkeyVoiceAnalysisEnabled={appState.latchkeyVoiceAnalysisEnabled}
                    onStatusChange={handleStatusChange}
                    onPOVEdit={handlePOVEdit}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Focus View - Split Pane */
            <div className="flex h-full">
              {/* Left Pane - Article List (30%) */}
              <div className="w-[30%] border-r border-border bg-muted/20 flex flex-col">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-lg">Articles</h3>
                  <p className="text-sm text-muted-foreground">
                    {sortedArticles.length} articles • Click to review
                  </p>
                </div>
                <div className="flex-1 overflow-auto p-4">
                  <ArticleList
                    articles={sortedArticles}
                    selectedArticleId={selectedArticleId}
                    onArticleSelect={handleArticleSelect}
                  />
                </div>
              </div>
              
              {/* Right Pane - Selected Article Detail (70%) */}
              <div className="flex-1 overflow-auto p-6">
                {selectedArticle ? (
                  <ArticleCard
                    article={selectedArticle}
                    povQualityEnabled={appState.povQualityEnabled}
                    latchkeyVoiceAnalysisEnabled={appState.latchkeyVoiceAnalysisEnabled}
                    onStatusChange={handleStatusChange}
                    onPOVEdit={handlePOVEdit}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2 text-muted-foreground">
                        Select an Article
                      </h3>
                      <p className="text-muted-foreground">
                        Choose an article from the list to begin editorial review
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}