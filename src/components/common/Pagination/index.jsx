import React from "react";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const handleClick = (page) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav className="flex justify-center mt-6">
      <ul className="inline-flex items-center space-x-1">
        <li>
          <button
            className="px-3 py-1 rounded-l bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
        {getPageNumbers().map((page, idx) => (
          <li key={idx}>
            {page === '...' ? (
              <span className="px-3 py-1">...</span>
            ) : (
              <button
                className={`px-3 py-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => handleClick(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            className="px-3 py-1 rounded-r bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination; 