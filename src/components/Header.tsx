import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Upload, Wifi, WifiOff, Grid2X2, List } from "lucide-react";
import { BatchData } from "@/types/article";

interface HeaderProps {
  currentBatch: BatchData | null;
  agentStatus: {
    crewAI: 'online' | 'offline' | 'processing';
    newsletterAssembly: 'ready' | 'busy' | 'error';
  };
  currentView: 'grid' | 'focus';
  onViewToggle: (view: 'grid' | 'focus') => void;
  onRefreshFromCrewAI: () => void;
  onSyncToNewsletter: () => void;
}

export function Header({ 
  currentBatch, 
  agentStatus, 
  currentView,
  onViewToggle,
  onRefreshFromCrewAI, 
  onSyncToNewsletter 
}: HeaderProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <header className="h-16 border-b border-border bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <img 
              src="https://latchkey.ai/lovable-uploads/6ecc74f9-647b-4000-a25d-d462bb4f1be6.png" 
              alt="LatchKey AI Editorial Dashboard Logo" 
              className="h-10 w-auto"
            />
          </div>

          {/* Batch Info */}
          {currentBatch && (
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-primary/20">
                Batch: {formatDate(currentBatch.timestamp)}
              </Badge>
              <Badge variant="secondary">
                {currentBatch.articles.length} articles
              </Badge>
              <Badge variant="outline">
                {currentBatch.articles.filter(a => a.status === 'pending').length} pending
              </Badge>
            </div>
          )}
        </div>

        {/* Right side - View Toggle, Agent Controls and Status */}
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              onClick={() => onViewToggle('grid')}
              variant={currentView === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="gap-2 h-8"
            >
              <Grid2X2 className="h-4 w-4" />
              Grid View
            </Button>
            <Button
              onClick={() => onViewToggle('focus')}
              variant={currentView === 'focus' ? 'default' : 'ghost'}
              size="sm"
              className="gap-2 h-8"
            >
              <List className="h-4 w-4" />
              Focus View
            </Button>
          </div>
          
          {/* Agent Sync Controls */}
          <Button 
            variant="terminal" 
            size="sm" 
            onClick={onRefreshFromCrewAI}
            disabled={agentStatus.crewAI === 'processing'}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${agentStatus.crewAI === 'processing' ? 'animate-spin' : ''}`} />
            Refresh from CrewAI
          </Button>

          <Button 
            variant="approve" 
            size="sm" 
            onClick={onSyncToNewsletter}
            disabled={agentStatus.newsletterAssembly === 'busy'}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Sync to Newsletter
          </Button>

          {/* Status Indicators */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {agentStatus.crewAI === 'online' ? (
                <Wifi className="h-4 w-4 text-primary" />
              ) : (
                <WifiOff className="h-4 w-4 text-destructive" />
              )}
              <span className="text-xs text-muted-foreground">CrewAI</span>
            </div>
            
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${
                agentStatus.newsletterAssembly === 'ready' ? 'bg-primary' :
                agentStatus.newsletterAssembly === 'busy' ? 'bg-warning animate-pulse' :
                'bg-destructive'
              }`} />
              <span className="text-xs text-muted-foreground">Newsletter</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}