import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SketchPicker, ColorResult } from "react-color";
import { Button } from "react-bootstrap";

import Icon from "../../components/Icon";


interface Props {
    colour: string;
    setColour: (colour: string) => void;
}

const ToolBarColourPicker = ({ colour, setColour }: Props ) => {

    const [expanded, setExpanded] = useState(false);

    const [showPicker, setShowPicker] = useState(false);

    const handleChange = (colorResult: ColorResult) => {
        setColour(colorResult.hex);
    };

    return (
        <div className="d-flex align-items-center" style={{ height: "50px" }}>
            <Button
                variant="primary"
                style={{ width: "50px", height: "50px" }}
                onClick={() => setExpanded(!expanded)}
            >
                <Icon name="paint-bucket" />
            </Button>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        className="ms-2"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                    >

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
                                <div style={{ position: "absolute", zIndex: 100 }}>
                                    <SketchPicker color={colour} onChange={handleChange} />
                                </div>
                            )}
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ToolBarColourPicker;
