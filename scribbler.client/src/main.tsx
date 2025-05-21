import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';

import './assets/styles/custom.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById('root')!).render(
    <HelmetProvider>
        <StrictMode>
            <App />
        </StrictMode>,
    </HelmetProvider>
);

