/**
 * Computes pagination metadata based on total items and page size.
 * @param totalItems - Total number of items
 * @param currentPage - The current active page (1-indexed)
 * @param pageSize - Items per page
 */
export function getPaginationInfo(totalItems: number, currentPage: number, pageSize: number = 10) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  
  return {
    totalItems,
    totalPages,
    currentPage: validPage,
    hasNextPage: validPage < totalPages,
    hasPrevPage: validPage > 1,
    offset: (validPage - 1) * pageSize,
  };
}
