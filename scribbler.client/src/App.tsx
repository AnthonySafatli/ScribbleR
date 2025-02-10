import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

import IndexPage from './pages/Index/IndexPage';
import AccountPage from './pages/Account/AccountPage';
import ChatRoomPage from './pages/ChatRoom/ChatRoomPage';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/Account" element={<AccountPage />} />
                <Route path="/ChatRoom" element={<ChatRoomPage />} />

                {/* Fallback 404 Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
