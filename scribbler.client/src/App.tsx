import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import IndexPage from './pages/Index/IndexPage';
import AccountPage from './pages/Account/AccountPage';
import ChatRoomPage from './pages/ChatRoom/ChatRoomPage';
import NotFound from './pages/NotFound';

import { AppUser }from './models/AppUser';

import './App.css'

function App() {

    const [accountInfo, setAccountInfo] = useState<AppUser | null | undefined>(undefined)

    return (
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage accountInfo={accountInfo} setSignInInfo={setAccountInfo} />} />
                <Route path="/Account" element={<AccountPage accountInfo={accountInfo} setAccountInfo={setAccountInfo} />} />
                <Route path="/ChatRoom" element={<ChatRoomPage />} />

                {/* Fallback 404 Route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
