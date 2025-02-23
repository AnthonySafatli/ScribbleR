
interface Props {
    name: string,
    colour?: string | null,
}

function Icon({ name, colour = null }: Props) {

    const classColour = colour ? `text-${colour}` : "";

    return (
        <i className={`bi bi-${name} ` + classColour}></i>
    );
}

export default Icon;
