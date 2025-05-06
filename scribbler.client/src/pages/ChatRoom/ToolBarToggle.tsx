import { useState } from "react";
import { Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "../../components/Icon";

interface ToolBarToggleOptions {
    icon: string;
    label: string;
    onSelected: () => void;
    value: any;
}
interface Props {
    options: ToolBarToggleOptions[];
    selectedValue: any;
}

const ToolBarToggle = ({ options, selectedValue }: Props) => {

    const [expanded, setExpanded] = useState(false);
    const [selectedOption, setSelectedOption] = useState<ToolBarToggleOptions | null>(null);

    const clickOption = (option: ToolBarToggleOptions) => {
        option.onSelected();
        setSelectedOption(option)
    }

    return (
        <div className="d-flex align-items-center" style={{ height: "50px" }}>
            <Button
                variant="primary"
                style={{ width: "50px", height: "50px" }}
                onClick={() => setExpanded(!expanded)}
            >
                <Icon name={selectedOption?.icon ?? options[0].icon} />
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
                        <div className="d-flex gap-2">
                            {options.map((option, index) => (
                                <Button
                                    key={index}
                                    variant={option.value == selectedValue ? "primary" : "default"}
                                    onClick={() => clickOption(option)}
                                >
                                    <span className="text-nowrap">
                                        <Icon name={option.icon} />
                                    </span>
                                </Button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ToolBarToggle;
