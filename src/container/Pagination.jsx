import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];

    for (let page = 1; page <= totalPages; page++) {
      if (
        page === 1 ||
        page === totalPages ||
        Math.abs(page - currentPage) <= 1
      ) {
        pages.push(page);
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis");
      }
    }

    return pages;
  };

  const changePage = (event, page) => {
    event.preventDefault();

    if (page < 1 || page > totalPages) return;

    onPageChange(page);
  };

  return (
    <Pagination>
      <PaginationContent className="flex-wrap">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            onClick={(event) => changePage(event, currentPage - 1)}
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={`${page}-${index}`}>
            {page === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                aria-label={`Go to page ${page}`}
                onClick={(event) => changePage(event, page)}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
            onClick={(event) => changePage(event, currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
