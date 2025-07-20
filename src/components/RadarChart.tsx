import React, { useState } from 'react';
import { Trend, DistributionMethod, DistributionOption } from '../types/trend';
import { radarQuadrants } from '../data/trends';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

interface RadarChartProps {
  trends: Trend[];
  selectedTrend: Trend | null;
  onTrendSelect: (trend: Trend) => void;
  distributionMethod: DistributionMethod;
  onDistributionChange: (method: DistributionMethod) => void;
  size?: number;
}

const distributionOptions: DistributionOption[] = [
  {
    value: 'technology',
    label: 'Technology Readiness',
    description: 'Position based on technology maturity (TRL 1-9)'
  },
  {
    value: 'business',
    label: 'Business Readiness',
    description: 'Position based on business viability (BRL 1-5)'
  },
  {
    value: 'impact',
    label: 'Impact Level',
    description: 'Position based on potential impact'
  },
  {
    value: 'timeline',
    label: 'Time Horizon',
    description: 'Position based on expected timeline'
  }
];

export const RadarChart: React.FC<RadarChartProps> = ({
  trends,
  selectedTrend,
  onTrendSelect,
  distributionMethod,
  onDistributionChange,
  size = 400
}) => {
  const center = size / 2;
  const maxRadius = center - 40;
  const [hoveredTrend, setHoveredTrend] = useState<Trend | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPan, setLastPan] = useState({ x: 0, y: 0 });

  // Calculate position based on distribution method
  const calculatePosition = (trend: Trend) => {
    let radius = 0;
    
    switch (distributionMethod) {
      case 'technology':
        // TRL 1-9: closer to center = higher readiness
        radius = (9 - trend.readinessLevel) / 8;
        break;
      case 'business':
        // BRL 1-5: closer to center = higher readiness
        radius = (5 - trend.businessReadiness) / 4;
        break;
      case 'impact': {
        // Impact: closer to center = higher impact
        const impactValues = { 'Low': 4, 'Medium': 3, 'High': 2, 'Transformative': 1 };
        radius = (impactValues[trend.impact] - 1) / 3;
        break;
      }
      case 'timeline': {
        // Timeline: closer to center = sooner
        const timelineValues = { '2025': 1, '2026': 2, '2027': 3, '2028': 4, '2029+': 5 };
        radius = (timelineValues[trend.timeHorizon] - 1) / 4;
        break;
      }
      default:
        radius = trend.radius;
    }
    
    return Math.max(0.1, Math.min(0.9, radius));
  };

  // Convert polar coordinates to cartesian
  const polarToCartesian = (angle: number, radius: number) => {
    const radians = (angle - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(radians),
      y: center + radius * Math.sin(radians)
    };
  };

  // Generate concentric circles
  const circles = [0.2, 0.4, 0.6, 0.8, 1.0].map(ratio => ratio * maxRadius);

  // Generate axis lines
  const axisLines = [0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
    const end = polarToCartesian(angle, maxRadius);
    return { angle, end };
  });

  // Get color for trend based on category
  const getTrendColor = (trend: Trend) => {
    const quadrant = radarQuadrants.find(q => 
      trend.angle >= q.startAngle && trend.angle < q.endAngle
    );
    return quadrant?.color || '#6b7280';
  };

  // Get size based on impact
  const getTrendSize = (impact: string) => {
    switch (impact) {
      case 'Transformative': return 8;
      case 'High': return 6;
      case 'Medium': return 5;
      default: return 4;
    }
  };

  // Get ring labels based on distribution method
  const getRingLabels = () => {
    switch (distributionMethod) {
      case 'technology':
        return ['TRL 9', 'TRL 6-7', 'TRL 3-4', 'TRL 1-2'];
      case 'business':
        return ['BRL 5', 'BRL 4', 'BRL 2-3', 'BRL 1'];
      case 'impact':
        return ['Transformative', 'High', 'Medium', 'Low'];
      case 'timeline':
        return ['2025', '2026', '2027-28', '2029+'];
      default:
        return ['Mature', 'Developing', 'Emerging', 'Early'];
    }
  };

  const ringLabels = getRingLabels();

  // Handle zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.5, Math.min(3, zoom * delta));
    setZoom(newZoom);
  };

  // Handle pan start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setLastPan(pan);
    }
  };

  // Handle pan move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setPan({
        x: lastPan.x + deltaX,
        y: lastPan.y + deltaY
      });
    }
  };

  // Handle pan end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset zoom and pan
  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-muted-foreground">
            Distribution:
          </label>
          <Select value={distributionMethod} onValueChange={onDistributionChange}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {distributionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Zoom: {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={resetView}
            className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded border border-border transition-colors"
          >
            Reset View
          </button>
        </div>
      </div>

      {/* Radar Chart */}
      <div className="relative">
        <svg 
          width={size} 
          height={size} 
          className="overflow-visible cursor-grab"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Background circles */}
          {circles.map((radius, index) => (
            <circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              className="radar-grid"
              strokeOpacity={0.3}
            />
          ))}

          {/* Axis lines */}
          {axisLines.map(({ angle, end }) => (
            <line
              key={angle}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              className="radar-axis"
              strokeOpacity={0.2}
            />
          ))}

          {/* Quadrant labels */}
          {radarQuadrants.map((quadrant, index) => {
            const labelAngle = (quadrant.startAngle + quadrant.endAngle) / 2;
            const labelPos = polarToCartesian(labelAngle, maxRadius + 20);
            return (
              <text
                key={index}
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium fill-muted-foreground"
                style={{ fill: quadrant.color }}
              >
                {quadrant.name}
              </text>
            );
          })}

          {/* Ring labels */}
          {ringLabels.map((label, index) => {
            const ringIndex = [0, 2, 3, 4][index]; // Skip middle ring for clarity
            if (ringIndex !== undefined && circles[ringIndex]) {
              return (
                <text
                  key={index}
                  x={center + 20}
                  y={center - circles[ringIndex]}
                  className="text-xs fill-muted-foreground"
                  textAnchor="start"
                >
                  {label}
                </text>
              );
            }
            return null;
          })}

          {/* Trend dots */}
          {trends.map((trend) => {
            const calculatedRadius = calculatePosition(trend);
            const position = polarToCartesian(trend.angle, calculatedRadius * maxRadius);
            const isSelected = selectedTrend?.id === trend.id;
            const isHovered = hoveredTrend?.id === trend.id;
            const trendColor = getTrendColor(trend);
            const trendSize = getTrendSize(trend.impact);

            return (
              <g key={trend.id}>
                {/* Glow effect for selected trend */}
                {isSelected && (
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r={trendSize + 4}
                    fill={trendColor}
                    fillOpacity={0.3}
                    className="animate-pulse"
                  />
                )}
                
                {/* Hover glow effect */}
                {isHovered && !isSelected && (
                  <circle
                    cx={position.x}
                    cy={position.y}
                    r={trendSize + 2}
                    fill={trendColor}
                    fillOpacity={0.2}
                  />
                )}
                
                {/* Main trend dot */}
                <circle
                  cx={position.x}
                  cy={position.y}
                  r={trendSize}
                  fill={trendColor}
                  stroke={isSelected ? '#ffffff' : isHovered ? '#ffffff' : trendColor}
                  strokeWidth={isSelected ? 2 : isHovered ? 1 : 0}
                  className="cursor-pointer transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTrendSelect(trend);
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                  onMouseEnter={(e) => {
                    setHoveredTrend(trend);
                    setMousePosition({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseMove={(e) => {
                    if (!isDragging) {
                      setMousePosition({ x: e.clientX, y: e.clientY });
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredTrend(null);
                  }}
                  style={{
                    filter: isSelected ? 'brightness(1.2)' : isHovered ? 'brightness(1.1)' : 'none'
                  }}
                />
              </g>
            );
          })}
          </g>
        </svg>
      </div>

      {/* Hover Tooltip */}
      {hoveredTrend && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: getTrendColor(hoveredTrend) }}
                />
                <h3 className="font-semibold text-sm">{hoveredTrend.name}</h3>
              </div>
              
              <div className="flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  {hoveredTrend.category}
                </Badge>
                <Badge 
                  variant={hoveredTrend.impact === 'Transformative' ? 'default' : 'outline'} 
                  className="text-xs"
                >
                  {hoveredTrend.impact}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {hoveredTrend.timeHorizon}
                </Badge>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <div>TRL: {hoveredTrend.readinessLevel}/9</div>
                <div>BRL: {hoveredTrend.businessReadiness}/5</div>
              </div>
              
              <p className="text-xs text-muted-foreground line-clamp-2">
                {hoveredTrend.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};