import './App.css'
import ClearButton from './components/ClearButton';
import DrawCanvas from "./components/DrawCanvas";
import SendButton from './components/SendButton';
// import ToolBar from "./components/ToolBar";

function App() {
    return (
        <div className="container">
            <div className="d-flex flex-column justify-content-center">
                {/* <ToolBar /> */}
                <DrawCanvas />

                <div className="d-flex justify-content-around gap-2 my-4">
                    <SendButton />
                    <ClearButton />
                </div>
            </div>
        </div>
    );
}

export default App;
