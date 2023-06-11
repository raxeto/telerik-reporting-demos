import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Col, Row, Container, Form } from 'react-bootstrap';

function FileType() {
    const { reportName = '' } = useParams<{ reportName: string }>();
    const [fileFormats, setFileFormats] = useState<{ name: string; localizedName: string }[]>([]);
    const [selectedFileType, setSelectedFileType] = useState('');

    useEffect(() => {
        fetch('https://demos.telerik.com/reporting/api/reports/formats')
            .then((response) => response.json())
            .then((data) => setFileFormats(data));
    }, []);

    const handleFileTypeChange = (event : any) => {
        const selectedFileType = event.target.value;
        setSelectedFileType(selectedFileType);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <p className="lead">
                      {reportName}
                    </p>
                </Col>
            </Row>
            <Row>
                <Col sm={4}>
                    <Form>
                      <Form.Group className="mb-3" controlId="formFileType">
                            <Form.Label>Select a file type</Form.Label>
                            <Form.Select value={selectedFileType} onChange={handleFileTypeChange} aria-label="Select a file type">
                            <option value="">Select a file type</option>
                            {fileFormats.map((fileFormat) => (
                                <option key={fileFormat.name} value={fileFormat.name}>
                                    {fileFormat.localizedName}
                                </option>
                            ))}
                        </Form.Select>
                      </Form.Group>
                      <Link to={`/result?reportName=${encodeURIComponent(reportName)}&fileType=${selectedFileType}`}>
                            <button className="btn btn-primary">
                            Next
                        </button>
                       </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FileType;