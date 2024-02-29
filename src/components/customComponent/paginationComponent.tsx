// src/components/Pagination.jsx (or .tsx if using TypeScript)
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const paginationNumbers = (): number[] => {
        const pages = [1];
        let startPage = Math.max(2, currentPage - 1);
        let endPage = Math.min(totalPages - 1, currentPage + 1);
        const totalVisiblePages = 5;

        if (currentPage - 1 <= 2) {
            endPage = 1 + totalVisiblePages - 2;
        }
        if (totalPages - currentPage <= 2) {
            startPage = totalPages - (totalVisiblePages - 2);
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i > 1 && i < totalPages) {
                pages.push(i);
            }
        }

        pages.push(totalPages);
        return pages.filter((page, index, self) => self.indexOf(page) === index);
    };

    return (
        <nav className="flex mt-12 justify-center items-center nc-Pagination inline-flex space-x-1 text-base font-medium">
            {paginationNumbers().map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`inline-flex w-11 h-11 items-center justify-center rounded-full ${currentPage === number ? 'bg-primary-6000 text-white' : 'bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700'} focus:outline-none`}
                >
                    {number}
                </button>
            ))}
        </nav>
    );
};

export default Pagination;
