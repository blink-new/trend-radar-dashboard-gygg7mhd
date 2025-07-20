import React from 'react';
import { Search, Filter, BarChart3, Grid3X3 } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { FilterState } from '../types/trend';

interface SidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  viewMode: 'radar' | 'matrix';
  onViewModeChange: (mode: 'radar' | 'matrix') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange
}) => {
  const categories = ['Technology', 'Industry', 'Humanity'];
  const impacts = ['Low', 'Medium', 'High', 'Transformative'];
  const timeHorizons = ['2025', '2026', '2027', '2028', '2029+'];

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const toggleImpact = (impact: string) => {
    const newImpacts = filters.impacts.includes(impact)
      ? filters.impacts.filter(i => i !== impact)
      : [...filters.impacts, impact];
    
    onFiltersChange({ ...filters, impacts: newImpacts });
  };

  const toggleTimeHorizon = (horizon: string) => {
    const newHorizons = filters.timeHorizons.includes(horizon)
      ? filters.timeHorizons.filter(h => h !== horizon)
      : [...filters.timeHorizons, horizon];
    
    onFiltersChange({ ...filters, timeHorizons: newHorizons });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      readinessLevels: [],
      impacts: [],
      timeHorizons: [],
      searchQuery: ''
    });
  };

  const hasActiveFilters = filters.categories.length > 0 || 
                          filters.impacts.length > 0 || 
                          filters.timeHorizons.length > 0 || 
                          filters.searchQuery.length > 0;

  return (
    <div className="w-80 bg-card border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Trend Radar
        </h1>
        <p className="text-sm text-muted-foreground">
          Explore emerging trends across industries
        </p>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search trends..."
            value={filters.searchQuery}
            onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
            className="pl-10"
          />
        </div>
      </div>

      {/* View Toggle */}
      <div className="p-4 border-b border-border">
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'radar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('radar')}
            className="flex-1"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Radar
          </Button>
          <Button
            variant={viewMode === 'matrix' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('matrix')}
            className="flex-1"
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            Matrix
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Categories</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <Button
                    variant={filters.categories.includes(category) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleCategory(category)}
                    className="w-full justify-start text-xs"
                  >
                    <div 
                      className="w-2 h-2 rounded-full mr-2"
                      style={{
                        backgroundColor: category === 'Technology' ? '#22c55e' :
                                       category === 'Industry' ? '#3b82f6' : '#f59e0b'
                      }}
                    />
                    {category}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Impact Levels */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Impact Level</h4>
            <div className="flex flex-wrap gap-2">
              {impacts.map((impact) => (
                <Badge
                  key={impact}
                  variant={filters.impacts.includes(impact) ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => toggleImpact(impact)}
                >
                  {impact}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-4" />

          {/* Time Horizons */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Time Horizon</h4>
            <div className="flex flex-wrap gap-2">
              {timeHorizons.map((horizon) => (
                <Badge
                  key={horizon}
                  variant={filters.timeHorizons.includes(horizon) ? 'default' : 'outline'}
                  className="cursor-pointer text-xs"
                  onClick={() => toggleTimeHorizon(horizon)}
                >
                  {horizon}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>Transformative Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span>High Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span>Medium Impact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Low Impact</span>
          </div>
        </div>
      </div>
    </div>
  );
};