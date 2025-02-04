import { useState } from 'react';

import './App.css'

import ClearButton from './components/ClearButton';
import DrawCanvas from "./components/DrawCanvas";
import SendButton from './components/SendButton';

function App() {

    const [canvasClear, setCanvasClear] = useState(false);

    function requestCanvasClear() {
        setCanvasClear(!canvasClear);
    }

    return (
        <div className="container">
            <div className="d-flex flex-column justify-content-center">
                <DrawCanvas cleared={canvasClear} />

                <div className="d-flex justify-content-around gap-2 my-4">
                    <SendButton />
                    <ClearButton onClear={requestCanvasClear} />
                </div>
            </div>
        </div>
    );
}

export default App;
