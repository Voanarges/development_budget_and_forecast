import { Route, Routes } from 'react-router-dom';
import type { ReactElement } from 'react';
import { makeSnapshot } from '@default-project/budget-engine';
import type { ProjectSnapshot } from '@default-project/types';
import { queryKeys } from '../../lib/query-keys';
import { renderWithProviders, testQueryClient } from '../../testing/render';
import { normalise, type ProjectCache } from '../project/project-cache';
import { makeComponent, makeLand, makePlan, makeRooms } from './architecture-fixtures';

export const PID = 'project-1';

export function planSnapshot(overrides: Partial<ProjectSnapshot> = {}): ProjectSnapshot {
  return makeSnapshot({
    land: { ...makeLand(), utilities: [] },
    plan: { ...makePlan(), rooms: makeRooms(), components: [makeComponent()] },
    ...overrides,
  });
}

/** Renders `ui` under `/projects/:projectId/architecture` with the snapshot already cached. */
export function renderWithPlan(ui: ReactElement, snapshot: ProjectSnapshot = planSnapshot()) {
  const client = testQueryClient();
  client.setQueryData<ProjectCache>(queryKeys.project(PID), normalise(snapshot));
  const view = renderWithProviders(
    <Routes>
      <Route path="/projects/:projectId/architecture" element={ui} />
    </Routes>,
    { client, url: `/projects/${PID}/architecture` },
  );
  return { ...view, client };
}
