import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Lane, Step, Persona } from '../../types';
import { useUIStore } from '../../store/uiStore';
import { X } from 'lucide-react';
import { db } from '../../db/database';

const SVG_HEIGHT = 120;
const DOT_RADIUS = 5;
const PADDING_Y = 16;

function scoreToColor(score: number): string {
  const s = Math.max(-2, Math.min(2, score));
  const hue = ((s + 2) / 4) * 120;
  return `hsl(${hue}, 70%, 45%)`;
}

function scoreToY(score: number): number {
  const s = Math.max(-2, Math.min(2, score));
  const ratio = (s + 2) / 4;
  return SVG_HEIGHT - PADDING_Y - ratio * (SVG_HEIGHT - 2 * PADDING_Y);
}

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M${points[0].x},${points[0].y}`;

  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    const tension = 0.3;
    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

interface Props {
  lane: Lane;
  steps: Step[];
  stepPhaseColors: Map<string, string>;
  persona?: Persona;
}

export function ExperienceLaneRow({ lane, steps, stepPhaseColors, persona }: Props) {
  const openPanel = useUIStore((s) => s.openPanel);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgWidth, setSvgWidth] = useState(800);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSvgWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const deleteLane = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await db.lanes.delete(lane.id);
  };

  const totalWidth = steps.length;
  const colW = svgWidth / totalWidth;

  const points = steps.map((step, i) => ({
    x: (i + 0.5) * colW,
    y: scoreToY(step.experienceScore ?? 0),
    score: step.experienceScore ?? 0,
    step,
  }));

  const pathD = buildSmoothPath(points.map((p) => ({ x: p.x, y: p.y })));
  const neutralY = scoreToY(0);

  return (
    <>
      {/* Lane label cell */}
      <div className="group flex flex-col items-center justify-center gap-2 border-b border-r border-gray-200 bg-gray-50 px-3 py-3">
        <span className="text-sm font-medium text-gray-600">{lane.name}</span>
        {persona && (
          <button
            onClick={() => navigate(`/persona/${persona.id}`)}
            className="flex flex-col items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-sm transition-colors hover:bg-gray-50 hover:shadow"
          >
            <img
              src={persona.avatarUrl}
              alt={persona.title}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
            <span className="text-xs font-medium text-gray-700 text-center leading-tight">{persona.title}</span>
          </button>
        )}
        <button
          onClick={deleteLane}
          className="hidden rounded p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 group-hover:block"
          title="Delete lane"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* SVG graph spanning all step columns */}
      <div
        ref={containerRef}
        className="relative border-b border-gray-200"
        style={{ gridColumn: `span ${steps.length}` }}
      >
        {/* Phase-colored background columns */}
        <div className="absolute inset-0 flex">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex-1 border-r border-gray-200"
              style={{ backgroundColor: (stepPhaseColors.get(step.id) ?? '#888') + '12' }}
            />
          ))}
        </div>

        <svg
          width={svgWidth}
          height={SVG_HEIGHT}
          viewBox={`0 0 ${svgWidth} ${SVG_HEIGHT}`}
          className="relative block"
        >
          {/* Neutral baseline (dashed) */}
          <line
            x1={0}
            y1={neutralY}
            x2={svgWidth}
            y2={neutralY}
            stroke="#d1d5db"
            strokeWidth={1}
            strokeDasharray="6 4"
          />

          {/* Vertical dashed lines at step boundaries */}
          {steps.map((_, i) => {
            if (i === 0) return null;
            const x = i * colW;
            return (
              <line
                key={`vline-${i}`}
                x1={x}
                y1={0}
                x2={x}
                y2={SVG_HEIGHT}
                stroke="#e5e7eb"
                strokeWidth={1}
                strokeDasharray="4 3"
              />
            );
          })}

          {/* Smooth curve path */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="url(#experienceGradient)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="experienceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {points.map((p, i) => (
                <stop
                  key={i}
                  offset={`${((p.x / svgWidth) * 100).toFixed(1)}%`}
                  stopColor={scoreToColor(p.score)}
                />
              ))}
            </linearGradient>
          </defs>

          {/* Data point dots */}
          {points.map((pt, i) => (
            <circle
              key={`dot-${i}`}
              cx={pt.x}
              cy={pt.y}
              r={DOT_RADIUS}
              fill={scoreToColor(pt.score)}
              stroke="white"
              strokeWidth={2}
              className="cursor-pointer"
              onClick={() => openPanel(pt.step.id, 'step')}
            />
          ))}
        </svg>

        {/* Invisible click targets for each step column */}
        <div className="absolute inset-0 flex">
          {steps.map((step) => (
            <div
              key={step.id}
              className="flex-1 cursor-pointer"
              onClick={() => openPanel(step.id, 'step')}
              title={`${step.name}: ${(step.experienceScore ?? 0) > 0 ? '+' : ''}${(step.experienceScore ?? 0).toFixed(1)}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
