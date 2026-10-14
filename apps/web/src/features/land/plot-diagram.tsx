import type { ProjectCache } from '../project/project-cache';
import { useProjectSnapshot } from '../project/use-project-snapshot';
import { allowedFootprintCm2, formatCmAsM } from './land-calc';
import type { CachedLand } from './land-cache';

interface HouseRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

function selectHouse(cache: ProjectCache): HouseRect | null {
  const p = cache.plan;
  if (!p || p.footprintWidthCm <= 0 || p.footprintDepthCm <= 0) return null;
  return {
    x: p.siteOffsetXcm,
    y: p.siteOffsetYcm,
    w: p.footprintWidthCm,
    h: p.footprintDepthCm,
  };
}

const BOX = 200;

/**
 * Static mini site diagram: the plot to scale, the house from the plan (if any) and a north arrow.
 * Placeholder until block 08's `SitePlan` (features/architecture/site-plan.tsx) is merged; then
 * only this file switches to it (DESIGN constraint 10).
 */
export function PlotDiagram({
  projectId,
  land,
}: {
  projectId: string;
  land: CachedLand;
}) {
  const { data: house = null } = useProjectSnapshot(projectId, selectHouse);
  const w = land.plotWidthCm;
  const d = land.plotDepthCm;
  if (w <= 0 || d <= 0) {
    return (
      <figure className="flex h-[200px] items-center justify-center rounded-xl border border-dashed border-line text-sm text-muted">
        Set the plot width and depth to see the diagram
      </figure>
    );
  }
  const scale = (BOX - 40) / Math.max(w, d);
  const pw = w * scale;
  const pd = d * scale;
  const ox = (BOX - pw) / 2;
  const oy = 24;
  const allowed = allowedFootprintCm2(land.areaM2, land.grzBps);
  return (
    <figure
      aria-label="Plot diagram"
      className="rounded-xl border border-line bg-subtle/50 p-2"
    >
      <svg
        viewBox={`0 0 ${BOX} ${BOX}`}
        role="img"
        aria-label={`Plot ${formatCmAsM(w)} × ${formatCmAsM(d)}`}
        className="h-auto w-full"
      >
        <rect
          x={ox}
          y={oy}
          width={pw}
          height={pd}
          className="fill-ok-50 stroke-ok-600"
          strokeWidth={1.5}
          rx={2}
        />
        {house && (
          <rect
            data-testid="plot-diagram-house"
            x={ox + house.x * scale}
            y={oy + house.y * scale}
            width={house.w * scale}
            height={house.h * scale}
            className="fill-brand-100 stroke-brand-600"
            strokeWidth={1}
          />
        )}
        <text
          x={ox + pw / 2}
          y={oy - 6}
          textAnchor="middle"
          className="fill-muted text-[9px]"
        >
          {formatCmAsM(w)} · street
        </text>
        <text
          x={ox - 4}
          y={oy + pd / 2}
          textAnchor="middle"
          transform={`rotate(-90 ${ox - 4} ${oy + pd / 2})`}
          className="fill-muted text-[9px]"
        >
          {formatCmAsM(d)}
        </text>
        <g transform={`translate(${BOX - 14} 14)`} aria-label="North">
          <path d="M0 -10 L5 4 L0 1 L-5 4 Z" className="fill-ink" />
          <text
            y={14}
            textAnchor="middle"
            className="fill-ink text-[8px] font-semibold"
          >
            N
          </text>
        </g>
      </svg>
      <figcaption className="mt-1 text-xs text-muted">
        {house
          ? 'House position from the Architecture plan.'
          : 'No house plan yet.'}
        {allowed !== null && ' Allowed footprint follows GRZ (see Zoning).'}
      </figcaption>
    </figure>
  );
}
