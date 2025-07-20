import React, { useState, useRef } from 'react';
import { Trend } from '../types/trend';
import { Button } from './ui/button';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface MatrixChartProps {
  trends: Trend[];
  selectedTrend: Trend | null;
  onTrendSelect: (trend: Trend) => void;
  size?: number;
}

export function MatrixChart({ 
  trends, 
  selectedTrend, 
  onTrendSelect, 
  size = 600 
}: MatrixChartProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  // Chart dimensions and margins
  const margin = 80;
  const chartWidth = size - 2 * margin;
  const chartHeight = size - 2 * margin;

  // Scale functions
  const xScale = (trl: number) => margin + (trl - 1) * (chartWidth / 8); // TRL 1-9
  const yScale = (brl: number) => size - margin - (brl - 1) * (chartHeight / 4); // BRL 1-5

  // Category colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Technology': return '#22c55e';
      case 'Industry': return '#3b82f6';
      case 'Humanity': return '#eab308';
      default: return '#6b7280';
    }
  };

  // Impact size mapping
  const getImpactSize = (impact: string) => {
    switch (impact) {
      case 'Low': return 4;
      case 'Medium': return 6;
      case 'High': return 8;
      case 'Transformative': return 10;
      default: return 6;
    }
  };

  // Zoom and pan handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.5, Math.min(3, zoom * delta));
    setZoom(newZoom);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current || (e.target as Element).classList.contains('chart-background')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleTrendClick = (trend: Trend, e: React.MouseEvent) => {
    e.stopPropagation();
    onTrendSelect(trend);
  };

  return (
    <div className="relative">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2">
        <span className="text-xs text-muted-foreground">{Math.round(zoom * 100)}%</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setZoom(Math.min(3, zoom * 1.2))}
          className="h-8 w-8 p-0"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setZoom(Math.max(0.5, zoom * 0.8))}
          className="h-8 w-8 p-0"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetView}
          className="h-8 w-8 p-0"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Matrix Chart */}
      <svg
        ref={svgRef}
        width={size}
        height={size}
        className={`border border-border rounded-lg bg-card ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Background */}
          <rect
            x={0}
            y={0}
            width={size}
            height={size}
            fill="transparent"
            className="chart-background"
          />

          {/* Grid lines */}
          <g className="opacity-20">
            {/* Vertical grid lines (TRL) */}
            {Array.from({ length: 9 }, (_, i) => (
              <line
                key={`v-${i}`}
                x1={xScale(i + 1)}
                y1={margin}
                x2={xScale(i + 1)}
                y2={size - margin}
                stroke="currentColor"
                strokeWidth="1"
              />
            ))}
            {/* Horizontal grid lines (BRL) */}
            {Array.from({ length: 5 }, (_, i) => (
              <line
                key={`h-${i}`}
                x1={margin}
                y1={yScale(i + 1)}
                x2={size - margin}
                y2={yScale(i + 1)}
                stroke="currentColor"
                strokeWidth="1"
              />
            ))}
          </g>

          {/* Axes */}
          <g>
            {/* X-axis */}
            <line
              x1={margin}
              y1={size - margin}
              x2={size - margin}
              y2={size - margin}
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Y-axis */}
            <line
              x1={margin}
              y1={margin}
              x2={margin}
              y2={size - margin}
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>

          {/* Axis labels */}
          <g className="text-xs fill-current">
            {/* X-axis labels (TRL) */}
            {Array.from({ length: 9 }, (_, i) => (
              <text
                key={`x-label-${i}`}
                x={xScale(i + 1)}
                y={size - margin + 20}
                textAnchor="middle"
                className="fill-muted-foreground"
              >
                TRL {i + 1}
              </text>
            ))}
            {/* Y-axis labels (BRL) */}
            {Array.from({ length: 5 }, (_, i) => (
              <text
                key={`y-label-${i}`}
                x={margin - 30}
                y={yScale(i + 1) + 4}
                textAnchor="middle"
                className="fill-muted-foreground"
              >
                BRL {i + 1}
              </text>
            ))}
          </g>

          {/* Axis titles */}
          <g className="text-sm fill-current">
            {/* X-axis title */}
            <text
              x={size / 2}
              y={size - 20}
              textAnchor="middle"
              className="fill-foreground font-medium"
            >
              Technology Readiness Level (TRL)
            </text>
            {/* Y-axis title */}
            <text
              x={20}
              y={size / 2}
              textAnchor="middle"
              transform={`rotate(-90, 20, ${size / 2})`}
              className="fill-foreground font-medium"
            >
              Business Readiness Level (BRL)
            </text>
          </g>

          {/* Trend dots */}
          <g>
            {trends.map((trend) => {
              const x = xScale(trend.readinessLevel);
              const y = yScale(trend.businessReadiness);
              const radius = getImpactSize(trend.impact);
              const color = getCategoryColor(trend.category);
              const isSelected = selectedTrend?.id === trend.id;

              return (
                <g key={trend.id}>
                  {/* Selection ring */}
                  {isSelected && (
                    <circle
                      cx={x}
                      cy={y}
                      r={radius + 4}
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                  )}
                  {/* Trend dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={radius}
                    fill={color}
                    className={`cursor-pointer transition-all duration-200 hover:opacity-80 ${
                      isSelected ? 'opacity-100' : 'opacity-70'
                    }`}
                    onClick={(e) => handleTrendClick(trend, e)}
                  />
                  {/* Hover tooltip trigger */}
                  <circle
                    cx={x}
                    cy={y}
                    r={radius + 5}
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={(e) => handleTrendClick(trend, e)}
                  >
                    <title>{trend.name}</title>
                  </circle>
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4">
        <h4 className="text-sm font-medium mb-3">Legend</h4>
        <div className="space-y-2">
          {/* Categories */}
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground mb-1">Categories</div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
              <span>Technology</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
              <span>Industry</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-[#eab308]" />
              <span>Humanity</span>
            </div>
          </div>
          
          {/* Impact sizes */}
          <div className="space-y-1 pt-2 border-t border-border">
            <div className="text-xs text-muted-foreground mb-1">Impact Level</div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full bg-muted-foreground" />
              <span>Low</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-muted-foreground" />
              <span>Medium</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-4 h-4 rounded-full bg-muted-foreground" />
              <span>High</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-5 h-5 rounded-full bg-muted-foreground" />
              <span>Transformative</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      {!selectedTrend && (
        <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 max-w-xs">
          <h3 className="text-sm font-medium mb-2">Matrix View</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• X-axis: Technology Readiness Level (TRL 1-9)</li>
            <li>• Y-axis: Business Readiness Level (BRL 1-5)</li>
            <li>• Dot size indicates impact level</li>
            <li>• Click dots to view trend details</li>
            <li>• Scroll to zoom, drag to pan</li>
          </ul>
        </div>
      )}
    </div>
  );
}