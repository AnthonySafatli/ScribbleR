
interface Props {
    onClear: () => void;
}

function ClearButton({ onClear }: Props) {

    return (
        <button className="btn btn-primary" onClick={onClear}>
            Clear!
        </button>
    );
}

export default ClearButton;