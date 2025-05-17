import { Button, Col, Container, Row } from 'react-bootstrap';

const About = () => {
    return (
        <Container className="my-5">
            <Row className="mb-5">
                <Col md={8} className="mx-auto text-center">
                    <h2 className="display-4">ScribbleR</h2>
                    <p className="lead">
                        ScribbleR is a fun, web-based chatroom where you can draw and message friends in real time. Inspired by the classic PictoChat, it brings the nostalgia back with modern features like private rooms and a friends list.
                    </p>
                    <Button
                        variant="primary"
                        className="m-2"
                        href="https://scribbler.anthonysafatli.ca/"
                    >
                        Try It Out
                    </Button>
                    <Button
                        variant="outline-secondary"
                        className="m-2"
                        href="https://anthonysafatli.ca/Project/scribbler"
                    >
                        More Information
                    </Button>
                    <Button
                        variant="outline-secondary"
                        className="m-2"
                        href="https://github.com/AnthonySafatli/ScribbleR"
                        target="_blank"
                    >
                        View on GitHub
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col md={8} className="mx-auto text-center">
                    <h3 className="display-6">Hello! I'm Anthony!</h3>
                    <p className="lead">
                        I'm a software developer and student at Dalhousie University.
                        I love building cool stuff, learning new tech, and exploring the outdoors.
                    </p>
                    <Button
                        variant="outline-primary"
                        className="m-2"
                        href="https://anthonysafatli.ca"
                        target="_blank"
                    >
                        Visit My Website
                    </Button>
                    <Button
                        variant="outline-secondary"
                        className="m-2"
                        href="https://www.linkedin.com/in/anthony-safatli/"
                        target="_blank"
                    >
                        LinkedIn Profile
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
