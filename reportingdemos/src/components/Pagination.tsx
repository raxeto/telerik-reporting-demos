import React from 'react';
import { useState } from "react";
import { Button } from 'react-bootstrap';

interface PaginationProps {
    currentPage: number;
    pageCount: number;
    onPageChange: (newPage: number) => void;
}

function Pagination(props: PaginationProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageCount = props.pageCount;

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === pageCount;

    const handlePrevPage = () => {
        const newPageNum = currentPage - 1;
        setCurrentPage(newPageNum);
        props.onPageChange(newPageNum);
    };

    const handleNextPage = () => {
        const newPageNum = currentPage + 1;
        setCurrentPage(newPageNum);
        props.onPageChange(newPageNum);
    };

    return (
        <div className="pagination d-flex justify-content-center">
            <Button className={isFirstPage ? "disabled" : ""} variant="secondary" size="sm" onClick={ handlePrevPage }>
                {"<"}
            </Button>

            <span className="ml-5 mr-5">{currentPage}</span>
            <span>/</span>
            <span className="ml-5 mr-5">{pageCount}</span>

            <Button className={isLastPage ? "disabled" : ""} variant="secondary" size="sm" onClick={ handleNextPage }>
                {">"}
            </Button>
        </div>
    );
}

export default Pagination;