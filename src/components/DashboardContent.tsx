import { useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import { ArticleList } from "./ArticleList";
import { Article } from "@/types/article";

interface DashboardContentProps {
  sortedArticles: Article[];
  currentView: 'grid' | 'focus';
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  povQualityEnabled: boolean;
  latchkeyVoiceAnalysisEnabled: boolean;
  onStatusChange: (articleId: string, status: Article['status']) => void;
  onPOVEdit: (articleId: string, newPOV: string) => void;
  onArticleSelect: (articleId: string) => void;
  hasBatch: boolean;
}

export function DashboardContent({
  sortedArticles,
  currentView,
  selectedArticleId,
  setSelectedArticleId,
  povQualityEnabled,
  latchkeyVoiceAnalysisEnabled,
  onStatusChange,
  onPOVEdit,
  onArticleSelect,
  hasBatch
}: DashboardContentProps) {
  // Auto-select first article when switching to focus view or when articles change
  useEffect(() => {
    if (currentView === 'focus' && sortedArticles.length > 0 && !selectedArticleId) {
      setSelectedArticleId(sortedArticles[0].id);
    }
  }, [currentView, sortedArticles, selectedArticleId, setSelectedArticleId]);

  // Get selected article for focus view
  const selectedArticle = selectedArticleId 
    ? sortedArticles.find(a => a.id === selectedArticleId) 
    : null;

  if (sortedArticles.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2 text-muted-foreground">No Articles Found</h2>
          <p className="text-muted-foreground">
            {hasBatch ? "Try adjusting your filters" : "Load a batch to get started"}
          </p>
        </div>
      </div>
    );
  }

  if (currentView === 'grid') {
    return (
      <div className="h-full overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              povQualityEnabled={povQualityEnabled}
              latchkeyVoiceAnalysisEnabled={latchkeyVoiceAnalysisEnabled}
              onStatusChange={onStatusChange}
              onPOVEdit={onPOVEdit}
            />
          ))}
        </div>
      </div>
    );
  }

  // Focus View - Split Pane
  return (
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
            onArticleSelect={onArticleSelect}
          />
        </div>
      </div>
      
      {/* Right Pane - Selected Article Detail (70%) */}
      <div className="flex-1 overflow-auto p-6">
        {selectedArticle ? (
          <ArticleCard
            article={selectedArticle}
            povQualityEnabled={povQualityEnabled}
            latchkeyVoiceAnalysisEnabled={latchkeyVoiceAnalysisEnabled}
            onStatusChange={onStatusChange}
            onPOVEdit={onPOVEdit}
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
  );
}