import React from 'react';
import { Container } from 'react-bootstrap';

interface Props {
    children: React.ReactNode;
}

function CenteredContainer({ children }: Props) {
    return (
        <Container>
            <div className="d-flex justify-content-center align-items-center"
                    style={{height: '100vh'}}>
                {children}
            </div>
        </Container>
    );
}

export default CenteredContainer;
