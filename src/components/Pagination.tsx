const Pagination = ({ pagination, onPageChange }: any) => {
    const { totalPages, currentPage, perPage } = pagination;
  
    const renderPageNumbers = () => {
      const pageNumbers = [];
  
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <li key={i} className="inline-block mx-1">
            <button
              className={`px-3 py-1 rounded ${i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 border border-gray-300 text-gray-700'}`}
              onClick={() => onPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
  
      return pageNumbers;
    };
  
    return (
      <div className="flex justify-center bg-transparent my-0">
        <ul className="flex">
          <li className="inline-block mx-1">
            <button
              className={`px-3 py-1 rounded ${currentPage > 1 ? 'bg-white border border-gray-300 text-gray-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {renderPageNumbers()}
          <li className="inline-block mx-1">
            <button
              className={`px-3 py-1 rounded ${currentPage < totalPages ? 'bg-white border border-gray-300 text-gray-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    );
  };
  
  export default Pagination;
  