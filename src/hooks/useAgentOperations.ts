import { useToast } from "@/hooks/use-toast";
import { AppState } from "@/types/article";

export function useAgentOperations(
  appState: AppState,
  setAppState: React.Dispatch<React.SetStateAction<AppState>>
) {
  const { toast } = useToast();

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

  return {
    handleRefreshFromCrewAI,
    handleSyncToNewsletter,
    handleExportDecisions,
    handleArchiveBatch
  };
}