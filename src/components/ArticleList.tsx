import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";
import { cn } from "@/lib/utils";

interface ArticleListProps {
  articles: Article[];
  selectedArticleId: string | null;
  onArticleSelect: (articleId: string) => void;
}

export function ArticleList({ articles, selectedArticleId, onArticleSelect }: ArticleListProps) {
  const getConfidenceBadgeVariant = (confidence: number) => {
    if (confidence >= 0.7) return "default";
    if (confidence >= 0.4) return "secondary";
    return "outline";
  };

  const getStatusBadgeVariant = (status: Article['status']) => {
    switch (status) {
      case 'approved': return "default";
      case 'rejected': return "destructive";
      case 'saved': return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-2">
      {articles.map((article) => (
        <Button
          key={article.id}
          variant="ghost"
          onClick={() => onArticleSelect(article.id)}
          className={cn(
            "w-full h-auto p-4 justify-start text-left hover:bg-muted/50",
            selectedArticleId === article.id && "bg-muted border border-primary/20"
          )}
        >
          <div className="w-full space-y-2">
            {/* Title */}
            <h3 className="font-medium text-sm leading-tight line-clamp-2">
              {article.title}
            </h3>
            
            {/* Badges Row */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge 
                variant={getConfidenceBadgeVariant(article.confidence)}
                className="h-5 text-xs"
              >
                {(article.confidence * 100).toFixed(0)}%
              </Badge>
              
              <Badge variant="outline" className="h-5 text-xs">
                {article.source}
              </Badge>
              
              <Badge 
                variant={getStatusBadgeVariant(article.status)}
                className="h-5 text-xs"
              >
                {article.status}
              </Badge>
            </div>

            {/* LatchKey Voice Score */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Voice:</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs font-medium">
                  {article.latchkeyVoiceScore.overallScore.toFixed(1)}/10
                </span>
              </div>
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
}