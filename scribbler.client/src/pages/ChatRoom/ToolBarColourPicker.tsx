import { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import { Button, Modal } from "react-bootstrap";

import Icon from "../../components/Icon";

interface Props {
    colour: string;
    setColour: (colour: string) => void;
}

const ToolBarColourPicker = ({ colour, setColour }: Props) => {
    const [expanded, setExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (colorResult: ColorResult) => {
        setColour(colorResult.hex);
    };

    const primaryDrawingColours = [
        { color: "#000000", title: "black" },
        { color: "#FFFFFF", title: "white" },
        { color: "#FF0000", title: "red" },
        { color: "#0000FF", title: "blue" },
        { color: "#00FF00", title: "green" },
        { color: "#FFFF00", title: "yellow" },
        { color: "#FFA500", title: "orange" },
        { color: "#800080", title: "purple" },
    ];

    return (
        <>
            <Button
                variant="primary"
                style={{ width: "50px", height: "50px" }}
                onClick={() => setExpanded(!expanded)}
            >
                <Icon name="paint-bucket" />
            </Button>

            {expanded && (
                <div className="ms-2" style={{ display: "inline-block", height: "50px", lineHeight: "50px" }}>
                    <div
                        onClick={() => setShowModal(true)}
                        style={{
                            backgroundColor: colour,
                            width: "36px",
                            height: "36px",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            display: "inline-block",
                            verticalAlign: "middle",
                        }}
                        title="Open color picker"
                    />
                </div>
            )}

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="sm"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Pick a Color</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center align-items-center">
                        <SketchPicker
                            color={colour}
                            onChange={handleChange}
                            presetColors={primaryDrawingColours}
                            disableAlpha />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ToolBarColourPicker;
