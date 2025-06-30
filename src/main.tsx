import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent flash of unstyled content
document.documentElement.classList.add('preload');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Remove preload class after a short delay
setTimeout(() => {
  document.documentElement.classList.remove('preload');
}, 100);