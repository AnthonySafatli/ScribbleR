import './App.css';

function App() {
    return (
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-2 bg-success">
                    <p>Tool Bar</p>
                </div>
                <div className="col-10 h-100 bg-danger">
                    <div className="d-flex justify-content-center h-100">
                        <div className="d-flex gap-2 flex-column w-100 h-100 bg-warning"> {/* Add max to width */}
                            <div className="bg-dark h-auto flex-grow-1"> 

                            </div>
                            <div className="bg-dark h-200 w-100">
                                <canvas className="bg-light"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
