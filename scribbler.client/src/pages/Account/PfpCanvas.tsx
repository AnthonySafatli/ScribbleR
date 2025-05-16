import { forwardRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { SketchPicker, ColorResult } from "react-color";

import DrawCanvas from "../../components/DrawCanvas";
import Icon from "../../components/Icon";

const PfpCanvas = forwardRef<ReactSketchCanvasRef>((_, ref) => {

    const [size, setSize] = useState(4);
    const [colour, setColour] = useState("#000000");
    const [showPicker, setShowPicker] = useState(false);

    const handleChangeColour = (colorResult: ColorResult) => {
        setColour(colorResult.hex);
    };

    const clearPfp = () => {
        (ref as React.RefObject<ReactSketchCanvasRef>)?.current?.clearCanvas();
    }

    return (
        <>
            <div className="d-flex justify-content-center">
                <DrawCanvas
                    ref={ref}
                    width={200}
                    height={200}
                    size={size}
                    colour={colour} />
            </div>
            <div className="d-flex justify-content-center gap-3 align-items-center mt-2">
                <Button variant="primary" onClick={() => clearPfp()}>
                    <Icon name="trash3" />
                </Button>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <div
                        onClick={() => setShowPicker(!showPicker)}
                        style={{
                            backgroundColor: colour,
                            width: "36px",
                            height: "36px",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                        }}
                    />
                    {showPicker && (
                        <div style={{ position: "absolute", zIndex: 2 }}>
                            <SketchPicker color={colour} onChange={handleChangeColour} />
                        </div>
                    )}
                </div>
                <div className="d-flex gap-1">
                    <Icon name="brush" />
                    <Form.Range
                        min={1}
                        max={40}
                        value={size}
                        onChange={(e) => setSize(parseInt(e.target.value))}
                    />
                </div>
            </div>
        </>
    );
});

export default PfpCanvas;