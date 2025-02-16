import React from 'react';
import { Container } from 'react-bootstrap';

interface Props {
    children: React.ReactNode;
}

function CenteredContainer({ children }: Props) {
    return (
        <Container fluid className="flex-grow-1">
            <div className="d-flex justify-content-center align-items-center"
                style={{ height: '100%' }}>
                {children}
            </div>
        </Container>
    );
}

export default CenteredContainer;
