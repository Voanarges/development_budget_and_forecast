import { Route, Routes } from 'react-router-dom';
import { HealthBadge } from '../features/health/health-badge';

export function App() {
  return (
    <main>
      <h1>Interview workspace</h1>
      <HealthBadge />
      <Routes>
        <Route path="/" element={null} />
      </Routes>
    </main>
  );
}

export default App;
