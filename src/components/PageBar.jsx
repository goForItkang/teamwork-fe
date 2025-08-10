import React from 'react';

const PageBar = ({ count, currentPage, pageSize = 10, pageBarSize = 5, setCurrentPage }) => {
  const totalPage = Math.ceil(count / pageSize);
  const startPage = Math.floor((currentPage - 1) / pageBarSize) * pageBarSize + 1;
  const endPage = Math.min(startPage + pageBarSize - 1, totalPage);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex gap-2 justify-center mt-6">
      {startPage > 1 && (
        <button
          onClick={() => setCurrentPage(startPage - 1)}
          className="px-3 py-1 border rounded"
        >
          ◀
        </button>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 border rounded ${
            page === currentPage ? 'bg-blue-500 text-white font-bold' : ''
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPage && (
        <button
          onClick={() => setCurrentPage(endPage + 1)}
          className="px-3 py-1 border rounded"
        >
          ▶
        </button>
      )}
    </div>
  );
};

export default PageBar;
