import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const Home = () => {
    return (
        <Container>
             <Row>
                <Col>
                    <Alert variant="primary">
                        <Alert.Heading>Hey, nice to see you</Alert.Heading>
                        <p>
                            This is a test project build with React which demonstrates <a href="https://www.telerik.com/products/reporting.aspx" target="_blank">Telerik Reporting</a> capabilities.
                            This website uses Telerik Reporting API deployed on <a href="https://demos.telerik.com/reporting/" target="_blank">https://demos.telerik.com/reporting/</a>
                        </p>
                        <hr />
                        <p className="mb-0">
                            To get started go to Reports page and select a demo report.
                        </p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;