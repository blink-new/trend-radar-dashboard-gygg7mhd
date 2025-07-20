import React, { useState, useMemo } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { RadarChart } from './components/RadarChart';
import { Sidebar } from './components/Sidebar';
import { TrendDetail } from './components/TrendDetail';
import { mockTrends } from './data/trends';
import { Trend, FilterState, DistributionMethod } from './types/trend';

function App() {
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);
  const [viewMode, setViewMode] = useState<'radar' | 'matrix'>('radar');
  const [distributionMethod, setDistributionMethod] = useState<DistributionMethod>('technology');
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    readinessLevels: [],
    impacts: [],
    timeHorizons: [],
    searchQuery: ''
  });

  // Filter trends based on current filters
  const filteredTrends = useMemo(() => {
    return mockTrends.filter(trend => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(trend.category)) {
        return false;
      }

      // Impact filter
      if (filters.impacts.length > 0 && !filters.impacts.includes(trend.impact)) {
        return false;
      }

      // Time horizon filter
      if (filters.timeHorizons.length > 0 && !filters.timeHorizons.includes(trend.timeHorizon)) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        return (
          trend.name.toLowerCase().includes(query) ||
          trend.description.toLowerCase().includes(query) ||
          trend.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [filters]);

  const handleTrendSelect = (trend: Trend) => {
    setSelectedTrend(trend);
  };

  const handleTrendDetailClose = () => {
    setSelectedTrend(null);
  };

  return (
    <div className="h-screen bg-background text-foreground overflow-hidden">
      <PanelGroup direction="horizontal">
        {/* Sidebar Panel */}
        <Panel defaultSize={20} minSize={15} maxSize={35}>
          <Sidebar
            filters={filters}
            onFiltersChange={setFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle className="w-2 bg-border hover:bg-accent transition-colors" />

        {/* Main Content Panel */}
        <Panel defaultSize={selectedTrend ? 50 : 80} minSize={30}>
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="border-b border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    {viewMode === 'radar' ? 'Radar View' : 'Matrix View'}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredTrends.length} of {mockTrends.length} trends
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Technology</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span>Industry</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span>Humanity</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visualization Area */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-background to-muted/20">
              {viewMode === 'radar' ? (
                <div className="relative">
                  <RadarChart
                    trends={filteredTrends}
                    selectedTrend={selectedTrend}
                    onTrendSelect={handleTrendSelect}
                    distributionMethod={distributionMethod}
                    onDistributionChange={setDistributionMethod}
                    size={600}
                  />
                  
                  {/* Instructions overlay */}
                  {!selectedTrend && (
                    <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 max-w-xs">
                      <h3 className="text-sm font-medium mb-2">How to use</h3>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        <li>• Click on any dot to view trend details</li>
                        <li>• Distance from center = maturity level</li>
                        <li>• Dot size = impact level</li>
                        <li>• Use filters to narrow down trends</li>
                        <li>• Scroll to zoom, drag to pan</li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <h3 className="text-lg font-medium mb-2">Matrix View</h3>
                  <p className="text-sm">Coming soon - Alternative visualization format</p>
                </div>
              )}
            </div>
          </div>
        </Panel>

        {/* Trend Detail Panel */}
        {selectedTrend && (
          <>
            <PanelResizeHandle className="w-2 bg-border hover:bg-accent transition-colors" />
            <Panel defaultSize={30} minSize={25} maxSize={50}>
              <TrendDetail
                trend={selectedTrend}
                trends={filteredTrends}
                onClose={handleTrendDetailClose}
                onTrendSelect={handleTrendSelect}
              />
            </Panel>
          </>
        )}
      </PanelGroup>
    </div>
  );
}

export default App;