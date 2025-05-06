import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Icon from "../../components/Icon";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
    size: number,
    setSize: (size: number) => void,
}

function ToolBarSizePicker({ size, setSize }: Props) {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className="d-flex align-items-center" style={{ height: "50px" }}>
            <Button
                variant="primary"
                style={{ width: "50px", height: "50px" }}
                onClick={() => setExpanded(!expanded)}
            >
                <Icon name="brush" />
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
                        <Form.Range
                            min={1}
                            max={40}
                            value={size}
                            onChange={(e) => setSize(parseInt(e.target.value))}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default ToolBarSizePicker;