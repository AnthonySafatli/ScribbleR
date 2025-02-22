
interface Props {
    name: string;
}

function Icon({ name }: Props) {
    return (
        <i className={`bi bi-${name}`}></i>
    );
}

export default Icon;
