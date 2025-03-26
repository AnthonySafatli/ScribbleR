import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import IndexPage from './pages/Index/IndexPage';
import AccountPage from './pages/Account/AccountPage';
import ChatRoomPage from './pages/ChatRoom/ChatRoomPage';
import NotFound from './pages/NotFound';

import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

import './App.css'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Index */}
                    <Route path="/" element={<IndexPage />} />

                    {/* Accounts */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/Account" element={<AccountPage />} />
                    </Route>

                    {/* Chatroom */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/ChatRoom/:chatroomId" element={<ChatRoomPage />} />
                    </Route>

                    {/* Fallback 404 Route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
