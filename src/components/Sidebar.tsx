import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  BarChart3, 
  Filter, 
  Archive, 
  Download, 
  Zap,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp
} from "lucide-react";
import { BatchData, FilterState } from "@/types/article";

interface SidebarProps {
  currentBatch: BatchData | null;
  filterSettings: FilterState;
  povQualityEnabled: boolean;
  latchkeyVoiceAnalysisEnabled: boolean;
  onFilterChange: (filters: FilterState) => void;
  onTogglePOVQuality: (enabled: boolean) => void;
  onToggleLatchkeyAnalysis: (enabled: boolean) => void;
  onExportDecisions: () => void;
  onArchiveBatch: () => void;
}

export function Sidebar({ 
  currentBatch, 
  filterSettings, 
  povQualityEnabled,
  latchkeyVoiceAnalysisEnabled,
  onFilterChange,
  onTogglePOVQuality,
  onToggleLatchkeyAnalysis,
  onExportDecisions,
  onArchiveBatch
}: SidebarProps) {
  if (!currentBatch) {
    return (
      <div className="w-64 border-r border-border bg-sidebar p-4">
        <div className="text-center text-muted-foreground py-8">
          No batch loaded
        </div>
      </div>
    );
  }

  const stats = currentBatch.processingStats;
  const articles = currentBatch.articles;
  
  const statusCounts = {
    approved: articles.filter(a => a.status === 'approved').length,
    rejected: articles.filter(a => a.status === 'rejected').length,
    saved: articles.filter(a => a.status === 'saved').length,
    pending: articles.filter(a => a.status === 'pending').length,
  };

  return (
    <div className="w-64 border-r border-border bg-sidebar h-full flex flex-col">
      {/* Current Batch Stats */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="h-4 w-4 text-primary" />
          <h2 className="font-semibold text-sidebar-foreground">CURRENT BATCH</h2>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-sidebar-foreground">Total Articles:</span>
            <Badge variant="outline">{stats.totalProcessed}</Badge>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-sidebar-foreground">High Confidence:</span>
            <Badge className="bg-confidence-high text-background">{stats.highConfidence}</Badge>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-sidebar-foreground">Medium Confidence:</span>
            <Badge className="bg-confidence-medium text-background">{stats.mediumConfidence}</Badge>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-sidebar-foreground">Low Confidence:</span>
            <Badge className="bg-confidence-low text-background">{stats.lowConfidence}</Badge>
          </div>

          <div className="flex justify-between text-sm pt-2 border-t border-sidebar-border">
            <span className="text-sidebar-foreground">Avg Voice Score:</span>
            <Badge variant="outline">{stats.avgLatchkeyVoiceScore.toFixed(1)}/10</Badge>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-sidebar-foreground">Power-Loader:</span>
            <Badge variant="outline">{stats.powerLoaderAlignment}%</Badge>
          </div>
        </div>
      </div>

      {/* Review Progress */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-3">
          <Target className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sidebar-foreground">REVIEW PROGRESS</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-confidence-high" />
              <span className="text-sidebar-foreground">Approved:</span>
            </div>
            <Badge className="bg-confidence-high text-background">{statusCounts.approved}</Badge>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <XCircle className="h-3 w-3 text-confidence-low" />
              <span className="text-sidebar-foreground">Rejected:</span>
            </div>
            <Badge className="bg-confidence-low text-background">{statusCounts.rejected}</Badge>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-warning" />
              <span className="text-sidebar-foreground">Saved Later:</span>
            </div>
            <Badge className="bg-warning text-background">{statusCounts.saved}</Badge>
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-muted-foreground" />
              <span className="text-sidebar-foreground">Pending:</span>
            </div>
            <Badge variant="outline">{statusCounts.pending}</Badge>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sidebar-foreground">QUICK FILTERS</h3>
        </div>
        
        <div className="space-y-2">
          <Button 
            variant={filterSettings.confidence === 'all' ? 'terminal' : 'ghost'}
            size="sm" 
            className="w-full justify-start"
            onClick={() => onFilterChange({ ...filterSettings, confidence: 'all' })}
          >
            All Articles
          </Button>
          
          <Button 
            variant={filterSettings.confidence === 'high' ? 'terminal' : 'ghost'}
            size="sm" 
            className="w-full justify-start"
            onClick={() => onFilterChange({ ...filterSettings, confidence: 'high' })}
          >
            High Confidence (0.7+)
          </Button>
          
          <Button 
            variant={filterSettings.status === 'pending' ? 'terminal' : 'ghost'}
            size="sm" 
            className="w-full justify-start"
            onClick={() => onFilterChange({ ...filterSettings, status: 'pending' })}
          >
            Needs Review
          </Button>
          
          <Button 
            variant={filterSettings.status === 'approved' ? 'terminal' : 'ghost'}
            size="sm" 
            className="w-full justify-start"
            onClick={() => onFilterChange({ ...filterSettings, status: 'approved' })}
          >
            Approved
          </Button>
          
          <Button 
            variant={filterSettings.status === 'rejected' ? 'terminal' : 'ghost'}
            size="sm" 
            className="w-full justify-start"
            onClick={() => onFilterChange({ ...filterSettings, status: 'rejected' })}
          >
            Rejected
          </Button>
        </div>
      </div>

      {/* Analysis Controls */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sidebar-foreground">ANALYSIS</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="pov-quality" className="text-sm text-sidebar-foreground">POV Quality Checks</Label>
            <Switch 
              id="pov-quality"
              checked={povQualityEnabled}
              onCheckedChange={onTogglePOVQuality}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="voice-analysis" className="text-sm text-sidebar-foreground">LatchKey Voice Analysis</Label>
            <Switch 
              id="voice-analysis"
              checked={latchkeyVoiceAnalysisEnabled}
              onCheckedChange={onToggleLatchkeyAnalysis}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 mt-auto">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sidebar-foreground">ACTIONS</h3>
        </div>
        
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start gap-2"
            onClick={onExportDecisions}
          >
            <Download className="h-4 w-4" />
            Export Decisions
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start gap-2"
            onClick={onArchiveBatch}
          >
            <Archive className="h-4 w-4" />
            Archive Batch
          </Button>
        </div>
      </div>
    </div>
  );
}