import Link from "next/link";
export default function Pagination({
  totalPages,
  currentPage,
  changePage,
}: {
  totalPages: string;
  currentPage: string;
  changePage: Function;
}) {
  const prevPage = parseInt(currentPage) - 1 > 0;
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages);

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button
            rel="previous"
            className="cursor-auto disabled:opacity-50"
            disabled={!prevPage}
          >
            Previous
          </button>
        )}
        {prevPage && (
          <button
            onClick={() => {
              changePage(+currentPage - 1 === 1 ? 1 : +currentPage - 1);
            }}
            rel="previous"
          >
            Previous
          </button>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button
            rel="next"
            className="cursor-auto disabled:opacity-50"
            disabled={!nextPage}
          >
            Next
          </button>
        )}
        {nextPage && (
          <button
            onClick={() => {
              changePage(+currentPage + 1);
            }}
            rel="next"
          >
            Next
          </button>
        )}
      </nav>
    </div>
  );
}
