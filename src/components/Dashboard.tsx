import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { DashboardContent } from "./DashboardContent";
import { useDashboardState } from "@/hooks/useDashboardState";
import { useArticleOperations } from "@/hooks/useArticleOperations";
import { useAgentOperations } from "@/hooks/useAgentOperations";

export function Dashboard() {
  const {
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
  } = useDashboardState();

  const {
    sortedArticles,
    handleStatusChange,
    handlePOVEdit
  } = useArticleOperations(appState, setAppState);

  const {
    handleRefreshFromCrewAI,
    handleSyncToNewsletter,
    handleExportDecisions,
    handleArchiveBatch
  } = useAgentOperations(appState, setAppState);

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
          <DashboardContent
            sortedArticles={sortedArticles}
            currentView={currentView}
            selectedArticleId={selectedArticleId}
            setSelectedArticleId={setSelectedArticleId}
            povQualityEnabled={appState.povQualityEnabled}
            latchkeyVoiceAnalysisEnabled={appState.latchkeyVoiceAnalysisEnabled}
            onStatusChange={handleStatusChange}
            onPOVEdit={handlePOVEdit}
            onArticleSelect={handleArticleSelect}
            hasBatch={!!appState.currentBatch}
          />
        </main>
      </div>
    </div>
  );
}