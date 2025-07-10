import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Edit3, 
  Save, 
  X, 
  ExternalLink,
  Target,
  Zap,
  TrendingUp,
  User,
  Bot,
  ArrowRight
} from "lucide-react";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
  povQualityEnabled: boolean;
  latchkeyVoiceAnalysisEnabled: boolean;
  onStatusChange: (articleId: string, status: Article['status']) => void;
  onPOVEdit: (articleId: string, newPOV: string) => void;
}

export function ArticleCard({ 
  article, 
  povQualityEnabled,
  latchkeyVoiceAnalysisEnabled,
  onStatusChange, 
  onPOVEdit 
}: ArticleCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPOV, setEditedPOV] = useState(article.proposedPOV);

  const handleSavePOV = () => {
    onPOVEdit(article.id, editedPOV);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedPOV(article.proposedPOV);
    setIsEditing(false);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.7) return 'confidence-high';
    if (confidence >= 0.4) return 'confidence-medium';
    return 'confidence-low';
  };

  const getConfidenceBorder = (confidence: number) => {
    if (confidence >= 0.7) return 'border-confidence-high shadow-confidence-high';
    if (confidence >= 0.4) return 'border-confidence-medium shadow-confidence-medium';
    return 'border-confidence-low shadow-confidence-low';
  };

  const getPowerLoaderColor = (fit: string) => {
    switch (fit) {
      case 'HIGH': return 'bg-confidence-high text-background';
      case 'MEDIUM': return 'bg-confidence-medium text-background';
      case 'LOW': return 'bg-confidence-low text-background';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getVoiceScoreColor = (score: number) => {
    if (score >= 8) return 'text-confidence-high';
    if (score >= 6) return 'text-confidence-medium';
    return 'text-confidence-low';
  };

  return (
    <Card className={`p-6 border-2 transition-all duration-300 hover:shadow-lg ${getConfidenceBorder(article.confidence)}`}>
      {/* Header with Confidence and Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge className={`bg-${getConfidenceColor(article.confidence)} text-background`}>
          Confidence: {(article.confidence * 100).toFixed(0)}%
        </Badge>
        <Badge variant="outline">{article.source}</Badge>
        <Badge className={getPowerLoaderColor(article.powerLoaderFit)}>
          Power-Loader: {article.powerLoaderFit}
        </Badge>
        
        {povQualityEnabled && article.povQuality && (
          <Badge variant={article.povQuality.genXHookDetected ? "default" : "destructive"}>
            POV Quality: {article.povQuality.genXHookDetected ? '✅ Good' : '⚠️ Warning'}
          </Badge>
        )}
        
        <Badge variant="outline">
          Char: {article.proposedPOV.length}/200
        </Badge>
      </div>

      {/* LatchKey Voice Score */}
      {latchkeyVoiceAnalysisEnabled && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm">LatchKey Voice:</span>
            <span className={`font-bold ${getVoiceScoreColor(article.latchkeyVoiceScore.overallScore)}`}>
              {article.latchkeyVoiceScore.overallScore.toFixed(1)}/10
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${article.latchkeyVoiceScore.elements.confidentGroundedTone ? 'bg-confidence-high' : 'bg-muted-foreground'}`} />
              <span>Confident tone</span>
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${article.latchkeyVoiceScore.elements.colleagueApproach ? 'bg-confidence-high' : 'bg-muted-foreground'}`} />
              <span>Colleague approach</span>
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${article.latchkeyVoiceScore.elements.parentheticalHonesty ? 'bg-confidence-high' : 'bg-muted-foreground'}`} />
              <span>Parenthetical honesty</span>
            </div>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${article.latchkeyVoiceScore.elements.genXCulturalRef ? 'bg-confidence-high' : 'bg-muted-foreground'}`} />
              <span>Gen X reference</span>
            </div>
          </div>
        </div>
      )}

      {/* Article Title */}
      <h3 className="text-lg font-semibold mb-3 text-foreground leading-tight">
        {article.title}
      </h3>

      {/* LatchKey POV */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm text-foreground">LATCHKEY POV:</span>
        </div>
        
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedPOV}
              onChange={(e) => setEditedPOV(e.target.value)}
              placeholder="Edit the LatchKey POV..."
              className="min-h-[80px] resize-none"
            />
            <div className="flex gap-2">
              <Button size="sm" variant="approve" onClick={handleSavePOV}>
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative group">
            <p className="text-sm text-foreground bg-muted/30 p-3 rounded-md border italic">
              "{article.proposedPOV}"
            </p>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setIsEditing(true)}
            >
              <Edit3 className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Power-Loader Analysis */}
      <div className="mb-4 p-3 bg-muted/30 rounded-lg border">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm">POWER-LOADER ANALYSIS:</span>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <User className="h-3 w-3 text-confidence-high" />
            <span className="font-medium">Human:</span>
            <span className="text-muted-foreground">{article.powerLoaderAnalysis.humanContribution}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bot className="h-3 w-3 text-primary" />
            <span className="font-medium">AI:</span>
            <span className="text-muted-foreground">{article.powerLoaderAnalysis.aiContribution}</span>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="h-3 w-3 text-confidence-medium" />
            <span className="font-medium">Result:</span>
            <span className="text-foreground font-semibold">{article.powerLoaderAnalysis.resultMultiplier}</span>
          </div>
        </div>
      </div>

      {/* Gen X Score and Pain Points */}
      <div className="mb-4">
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Gen X Score:</span>
            </div>
            <Badge className={`bg-${getConfidenceColor(article.genXScore / 100)} text-background`}>
              {article.genXScore}/100
            </Badge>
          </div>
          
          <div>
            <span className="text-sm font-medium text-foreground">💡 Pain Points:</span>
            <p className="text-sm text-muted-foreground mt-1">{article.painPoints.join(", ")}</p>
          </div>
        </div>
      </div>

      {/* Suggested Headlines */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold text-foreground">📰 SUGGESTED HEADLINES:</span>
        </div>
        <ul className="space-y-1">
          {article.suggestedHeadlines.map((headline, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              • {headline}
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          size="sm" 
          variant="approve" 
          onClick={() => onStatusChange(article.id, 'approved')}
          disabled={article.status === 'approved'}
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          APPROVE
        </Button>
        
        <Button 
          size="sm" 
          variant="reject" 
          onClick={() => onStatusChange(article.id, 'rejected')}
          disabled={article.status === 'rejected'}
        >
          <XCircle className="h-3 w-3 mr-1" />
          REJECT
        </Button>
        
        <Button 
          size="sm" 
          variant="warning" 
          onClick={() => onStatusChange(article.id, 'saved')}
          disabled={article.status === 'saved'}
        >
          <Clock className="h-3 w-3 mr-1" />
          LATER
        </Button>
        
        {!isEditing && (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setIsEditing(true)}
          >
            <Edit3 className="h-3 w-3 mr-1" />
            EDIT POV
          </Button>
        )}
      </div>

      {/* Footer Links */}
      <div className="flex gap-3 pt-3 border-t border-border">
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-xs"
          onClick={() => window.open(article.url, '_blank')}
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Read Full Article
        </Button>
        
        <Button 
          size="sm" 
          variant="ghost" 
          className="text-xs"
        >
          🔍 View Analysis
        </Button>
      </div>

      {/* Status Indicator */}
      {article.status !== 'pending' && (
        <div className="absolute top-2 right-2">
          <Badge 
            className={
              article.status === 'approved' ? 'bg-confidence-high text-background' :
              article.status === 'rejected' ? 'bg-confidence-low text-background' :
              'bg-warning text-background'
            }
          >
            {article.status.toUpperCase()}
          </Badge>
        </div>
      )}
    </Card>
  );
}