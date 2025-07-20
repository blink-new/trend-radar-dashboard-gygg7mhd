import React from 'react';
import { X, Calendar, Target, TrendingUp, Clock, Tag, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Trend } from '../types/trend';

interface TrendDetailProps {
  trend: Trend | null;
  trends: Trend[];
  onClose: () => void;
  onTrendSelect: (trend: Trend) => void;
}

export const TrendDetail: React.FC<TrendDetailProps> = ({ trend, trends, onClose, onTrendSelect }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technology': return '#22c55e';
      case 'Industry': return '#3b82f6';
      case 'Humanity': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Transformative': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  // Show trends list when no trend is selected
  if (!trend) {
    return (
      <div className="w-full bg-card h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">All Trends</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4" />
              <span>{trends.length} trends</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Click on any trend to view detailed information
          </p>
        </div>

        {/* Trends List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {trends.map((trendItem) => (
              <div
                key={trendItem.id}
                onClick={() => onTrendSelect(trendItem)}
                className="p-4 bg-muted/30 hover:bg-muted/50 rounded-lg border border-border/50 hover:border-border cursor-pointer transition-all duration-200 hover:shadow-sm"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-foreground text-sm leading-tight">
                    {trendItem.name}
                  </h3>
                  <div 
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: getCategoryColor(trendItem.category) }}
                  />
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    className={`${getImpactColor(trendItem.impact)} text-white text-xs`}
                  >
                    {trendItem.impact}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {trendItem.category}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {trendItem.description}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">
                      TRL {trendItem.readinessLevel}/9
                    </span>
                    <span className="text-muted-foreground">
                      BRL {trendItem.businessReadiness}/5
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {trendItem.timeHorizon}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Select a trend from the radar or list to view details
          </p>
        </div>
      </div>
    );
  }

  const readinessPercentage = (trend.readinessLevel / 9) * 100;
  const businessPercentage = (trend.businessReadiness / 5) * 100;

  return (
    <div className="w-full bg-card h-full flex flex-col animate-slide-up">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground mb-2">{trend.name}</h2>
            <div className="flex items-center gap-2 mb-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getCategoryColor(trend.category) }}
              />
              <span className="text-sm text-muted-foreground">{trend.category}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Badge 
            className={`${getImpactColor(trend.impact)} text-white`}
          >
            {trend.impact} Impact
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {trend.timeHorizon}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2 text-muted-foreground">Description</h3>
          <p className="text-sm text-foreground leading-relaxed">{trend.description}</p>
        </div>

        <Separator className="my-6" />

        {/* Readiness Levels */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">Readiness Assessment</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Technology Readiness</span>
                <span className="text-sm text-muted-foreground">Level {trend.readinessLevel}/9</span>
              </div>
              <Progress value={readinessPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {trend.readinessLevel <= 3 ? 'Research & Development' :
                 trend.readinessLevel <= 6 ? 'Technology Development' :
                 'System Development & Deployment'}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Business Readiness</span>
                <span className="text-sm text-muted-foreground">Level {trend.businessReadiness}/5</span>
              </div>
              <Progress value={businessPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {trend.businessReadiness <= 2 ? 'Early Market Exploration' :
                 trend.businessReadiness <= 3 ? 'Market Development' :
                 'Market Deployment'}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Metrics */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Impact</span>
              </div>
              <p className="text-sm font-semibold">{trend.impact}</p>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span className="text-xs font-medium">Maturity</span>
              </div>
              <p className="text-sm font-semibold">
                {trend.readinessLevel <= 3 ? 'Early' :
                 trend.readinessLevel <= 6 ? 'Developing' : 'Advanced'}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Tags */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3 text-muted-foreground flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {trend.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Timeline */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3 text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Timeline
          </h3>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Expected Adoption</span>
              <Badge variant="outline">{trend.timeHorizon}</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Based on current readiness levels and market conditions
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date(trend.lastUpdated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};