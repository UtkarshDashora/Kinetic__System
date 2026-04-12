import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import Dashboard from './pages/Dashboard.tsx';
import CrowdMap from './pages/portfolio/CrowdMap.tsx';
import Concessions from './pages/portfolio/Concessions.tsx';
import FriendFinder from './pages/portfolio/FriendFinder.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/portfolio/live-map" element={<CrowdMap />} />
          <Route path="/portfolio/concessions" element={<Concessions />} />
          <Route path="/portfolio/friend-finder" element={<FriendFinder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
