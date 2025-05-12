import React from 'react';
import './pagination.css'; // Optional for custom styles

const BootstrapPagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  className = ''
}) => {
  // Calculate visible page numbers (with ellipsis for many pages)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftBound = Math.max(1, currentPage - 2);
      const rightBound = Math.min(totalPages, currentPage + 2);
      
      if (leftBound > 1) pages.push(1);
      if (leftBound > 2) pages.push('...');
      
      for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
      }
      
      if (rightBound < totalPages - 1) pages.push('...');
      if (rightBound < totalPages) pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <nav aria-label="Table pagination" className={className}>
      <ul className="pagination mb-0">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            &laquo; Previous
          </button>
        </li>
        
        {getPageNumbers().map((pageNum, index) => (
          <li 
            key={index} 
            className={`page-item ${pageNum === '...' ? 'disabled' : ''} ${currentPage === pageNum ? 'active' : ''}`}
          >
            {pageNum === '...' ? (
              <span className="page-link">...</span>
            ) : (
              <button 
                className="page-link" 
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
                {currentPage === pageNum && <span className="visually-hidden">(current)</span>}
              </button>
            )}
          </li>
        ))}
        
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default BootstrapPagination;