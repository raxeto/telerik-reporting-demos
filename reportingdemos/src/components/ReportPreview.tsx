import React from 'react';
import { useState, useEffect } from "react";
import Pagination from './Pagination';
import { Alert, Col, Row, Container } from 'react-bootstrap';

interface ReportPreviewProps {
    clientId: string;
    instanceId: string;
    documentId: string;
    pageCount: number;
}

function ReportPreview(props: ReportPreviewProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageCount = props.pageCount;


    const handlePageChange = async (newPage: number) => {
        setCurrentPage(newPage);
        await showPreviewPage(props.clientId, props.instanceId, props.documentId, newPage);
    }

    const showPreviewPage = async (clientId: string, instanceId: string, documentId: string, pageNum: number) => {
        try {
            const previewResponse = await fetch(`https://demos.telerik.com/reporting/api/reports/clients/${clientId}/instances/${instanceId}/documents/${documentId}/pages/${pageNum}`);

            if (previewResponse.ok) {
                const previewJson = await previewResponse.json();
                if (previewJson.pageReady) {
                    const reportPreview = document.querySelector('#report-preview');
                    if (reportPreview) {
                        reportPreview.innerHTML = previewJson.pageContent;
                    }
                }

            } else {
                console.error('Error:', previewResponse.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        showPreviewPage(props.clientId, props.instanceId, props.documentId, 1);
    }, []);


    return (
          <Container id="report-preview-container" >
              <Row>
                  <Col>
                      <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange} />
                  </Col>
              </Row>
              <Row>
                  <Col>
                    <div id="report-preview"></div>
                  </Col>
              </Row>
          </Container>
    );
}

export default ReportPreview;