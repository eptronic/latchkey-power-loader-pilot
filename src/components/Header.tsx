import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Upload, Wifi, WifiOff } from "lucide-react";
import { BatchData } from "@/types/article";

interface HeaderProps {
  currentBatch: BatchData | null;
  agentStatus: {
    crewAI: 'online' | 'offline' | 'processing';
    newsletterAssembly: 'ready' | 'busy' | 'error';
  };
  onRefreshFromCrewAI: () => void;
  onSyncToNewsletter: () => void;
}

export function Header({ 
  currentBatch, 
  agentStatus, 
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
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LK</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">LatchKey AI</h1>
              <p className="text-xs text-muted-foreground">Editorial Dashboard</p>
            </div>
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

        {/* Right side - Agent Controls and Status */}
        <div className="flex items-center gap-3">
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