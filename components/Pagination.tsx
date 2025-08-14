'use client';

import { PaginationData } from '../types';

interface PaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const { currentPage, totalPages } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust startPage if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }

  return (
    <div className="mt-12 flex justify-center">
      <div className="flex space-x-1">
        {/* Previous button */}
        <button 
          className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <i className="fa-solid fa-chevron-left text-gray-600"></i>
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            className={`w-10 h-10 flex items-center justify-center rounded-md ${
              pageNumber === currentPage
                ? 'bg-gray-700 text-white'
                : 'border border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}

        {/* Next button */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <i className="fa-solid fa-chevron-right text-gray-600"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;