import { report } from 'process';
import { async } from 'q';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Col, Row, Container } from 'react-bootstrap';
import ReportPreview from '../components/ReportPreview'
import { ReportParams } from '../helpers/ReportParams';

function Result() {
    const [showPreview, setShowPreview] = useState(false);
    const [showFileWarning, setShowFileWarning] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [clientId, setClientId] = useState('');
    const [instanceId, setInstanceId] = useState('');
    const [documentId, setDocumentId] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const reportName = searchParams.get('reportName') || '';
    const fileType = searchParams.get('fileType');

    const reportParams = ReportParams.getMap();

    const getClientAndInstance = async () => {
        const report = reportParams.get(reportName);

        if (report === null || report === undefined) {
            return null;
        }

        var reportFile = report.reportFile;
        var paramValues = report.paramValues;


        try {
            const regResponse = await fetch('https://demos.telerik.com/reporting/api/reports/clients', {
                method: 'POST'
            });

            if (regResponse.ok) {
                const regData = await regResponse.json();
                const clientId = regData.clientId;

                const instResponse = await fetch(`https://demos.telerik.com/reporting/api/reports/clients/${clientId}/instances`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        report: reportFile,
                        parameterValues: paramValues
                    })
                });

                if (instResponse.ok) {
                    const instData = await instResponse.json();
                    const instanceId = instData.instanceId;

                    return { clientId: clientId, instanceId: instanceId };
                }
            }
            
        } catch (error) {
            console.error('Error:', error);
        }

        return null;
    };

    const getReadyDocument = async (clientId: string, instanceId: string, fileFormat: string) => {
        try {
            const docResponse = await fetch(`https://demos.telerik.com/reporting/api/reports/clients/${clientId}/instances/${instanceId}/documents`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "format": fileFormat,
                    "deviceInfo": { "enableSearch": "true", "BasePath": "https://demos.telerik.com/reporting/api/reports" },
                    "useCache": true
                })
            });

            if (docResponse.ok) {
                const docData = await docResponse.json();
                const documentId = docData.documentId;

                let documentReady = false;
                let pageCount = 0;

                while (!documentReady) {
                    const docInfoResponse = await fetch(`https://demos.telerik.com/reporting/api/reports/clients/${clientId}/instances/${instanceId}/documents/${documentId}/info`);

                    if (docInfoResponse.ok) {
                        const docInfo = await docInfoResponse.json();
                        documentReady = true;
                        pageCount = docInfo.pageCount;
                    } else if (docInfoResponse.status != 201) {
                        break;
                    }
                }

                if (documentReady) {
                    return {
                        documentId: documentId, pageCount: pageCount
                    };
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }

        return null;
    };

    const handleDownloadClick = async () => {
        if (!fileType || fileType.trim().length === 0) {
            setShowFileWarning(true);
            return;
        }
        const clientInstance = await getClientAndInstance();

        if (clientInstance === null) {
            return;
        }

        const clientId = clientInstance.clientId;
        const instanceId = clientInstance.instanceId;

        const reportDoc = await getReadyDocument(clientId, instanceId, fileType);
        if (reportDoc === null) {
            return;
        }

        const documentId = reportDoc.documentId;

        try {
            const downLoadResponse = await fetch(`https://demos.telerik.com/reporting/api/reports/clients/${clientId}/instances/${instanceId}/documents/${documentId}?response-content-disposition=attachment`);

            if (downLoadResponse.ok) {
                const blob = await downLoadResponse.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'report';
                link.click();
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Error:', downLoadResponse.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePreviewClick = async () => {
        const clientInstance = await getClientAndInstance();

        if (clientInstance === null) {
            return;
        }

        const clientId = clientInstance.clientId;
        const instanceId = clientInstance.instanceId;

        const document = await getReadyDocument(clientId, instanceId, "HTML5");

        if (document === null) {
            return;
        }

        setPageCount(document.pageCount);
        setClientId(clientId);
        setInstanceId(instanceId);
        setDocumentId(document.documentId);

        setShowPreview(true);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className="display-4">Result</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="lead">Selected report: {reportName}</p>
                    <p className="lead">Selected file type: {fileType || "-"}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <button onClick={handleDownloadClick} className="btn btn-primary mx-2">Download</button>
                    <button onClick={handlePreviewClick} className="btn btn-secondary">Preview</button>
                </Col>
            </Row>
            <Row>
                <Col className="mt-3">
                    {showFileWarning &&
                        <Alert id="file-type-warning" variant="danger">
                            File type is not selected
                        </Alert>
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    {showPreview &&
                        <ReportPreview clientId={clientId} instanceId={instanceId} documentId={documentId} pageCount={pageCount} />
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default Result;