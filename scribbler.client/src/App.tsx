import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import Index from './pages/Index';
import Account from './pages/Account';
import ChatRoom from './pages/ChatRoom';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/Account" element={<Account />} />
                <Route path="/ChatRoom" element={<ChatRoom />} />

                {/* Fallback 404 Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
