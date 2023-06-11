import { async } from 'q';
import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Reports() {
    const [reportList, setReportList] = useState<{ name: string, summary: string }[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://demos.telerik.com/reporting');
                if (response.ok) {
                    const html = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const demosElement = doc.querySelector('#demos');
                    if (demosElement === null)
                        return;
                    const reportElements = demosElement.querySelectorAll('li');
                    const reports = Array.from(reportElements).map((reportElement) => {
                        const headerElement = reportElement.querySelector('.accordion-header');
                        const descriptionElement = reportElement.querySelector('.accordion-description');
                        const name = headerElement?.textContent?.trim() || '';
                        const summary = descriptionElement?.textContent?.trim() || '';
                        return { name, summary };
                    }).filter(report => report.name != "Web Report Designer");
                    setReportList(reports);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="card-list">
            <Container>
                <Row>
                    <Col>
                        <p className="lead">
                            Select from all available demo reports
                        </p>
                    </Col>
                </Row>
                <Row>
                    {reportList.map((report, index) => (
                        <Col xs={12} md={6} lg={4} xl={3} className="mb-4" key={index}>
                            <Card>
                                <Card.Body style={{ height: '260px', overflowY: 'auto' }}>
                                    <Card.Title>{report.name}</Card.Title>
                                    <Card.Text>{report.summary}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link className="btn btn-primary" to={`/file-type/${encodeURIComponent(report.name)}`} key={report.name}>
                                        Select
                                    </Link>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Reports;