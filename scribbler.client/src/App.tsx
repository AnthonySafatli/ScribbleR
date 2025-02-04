import './App.css'
import ClearButton from './components/ClearButton';

import DrawCanvas from "./components/DrawCanvas";
import SendButton from './components/SendButton';
import ToolBar from "./components/ToolBar";

function App() {
    return (
        <div className="container">
            <div className="d-flex gap-2">
                {/* <ToolBar /> */}
                <DrawCanvas />

                <div className="d-flex gap-2 ">
                    <SendButton />
                    <ClearButton />
                </div>
            </div>
        </div>
    );
}

export default App;
