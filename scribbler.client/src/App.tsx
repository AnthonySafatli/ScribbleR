import { useState } from 'react';
import { Container } from 'react-bootstrap';

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
        <Container>
            <div className="d-flex flex-column justify-content-center">
                <DrawCanvas cleared={canvasClear} />

                <div className="d-flex justify-content-around gap-2 my-4">
                    <SendButton />
                    <ClearButton onClear={requestCanvasClear} />
                </div>
            </div>
        </Container>
    );
}

export default App;
