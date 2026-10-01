import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { PortalRoute } from './components/PortalRoute.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      {window.location.pathname === '/login' || window.location.pathname === '/portal' ? <PortalRoute /> : <App />}
    </ErrorBoundary>
  </StrictMode>,
);
