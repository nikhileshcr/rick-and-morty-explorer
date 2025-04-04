import { Box, Pagination, ButtonGroup, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import GlobalSpinner from "./spinner";

/**
 * CharacterPagination Component
 *
 * This component provides pagination controls for navigating through
 * a paginated list of characters.
 *
 * Features:
 * - Displays Previous and Next navigation buttons.
 * - Dynamically generates page number buttons.
 * - Disables navigation buttons when at the first or last page.
 * - Shows a loading spinner while fetching data.
 */
const CharacterPagination = ({
  totalCharacters, // Total number of characters available
  totalPages, // Total number of pages based on character count
  currentPage, // The currently active page
  loading, // Indicates whether data is being loaded
}: {
  totalCharacters: number;
  totalPages: number;
  currentPage: number;
  loading: boolean;
}) => {
  return (
    <Box
      display="flex"
      justifyContent={{ base: "center", lg: "right" }}
      alignItems="center"
      marginTop="8"
      marginBottom="8"
    >
      {/* Pagination Container */}
      <Box w="fit-content" backgroundColor="gray.300" p="2" borderRadius="1em">
        <Pagination.Root
          count={totalCharacters} // Total characters to paginate
          pageSize={20} // Number of characters per page
          defaultPage={1} // Default page when no page is selected
          page={currentPage} // Active page
        >
          <ButtonGroup
            variant="plain"
            size={{ base: "2xs", sm: "2xs", lg: "sm" }}
          >
            {/* Previous Page Button */}
            <Pagination.PrevTrigger asChild>
              <Link href={`?page=${currentPage - 1}`}>
                <IconButton disabled={currentPage === 1 || loading}>
                  <LuChevronLeft />
                </IconButton>
              </Link>
            </Pagination.PrevTrigger>

            {/* Page Number Buttons */}
            <Pagination.Items
              render={(page) => (
                <Link href={`?page=${page.value}`}>
                  <IconButton
                    variant={{ base: "ghost", _selected: "outline" }}
                    disabled={page.value === currentPage || loading}
                  >
                    {page.value}
                  </IconButton>
                </Link>
              )}
            />

            {/* Next Page Button */}
            <Pagination.NextTrigger asChild>
              <Link href={`?page=${currentPage + 1}`}>
                <IconButton disabled={currentPage === totalPages || loading}>
                  <LuChevronRight />
                </IconButton>
              </Link>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Box>

      {/* Loading Spinner */}
      {loading && <GlobalSpinner />}
    </Box>
  );
};

export default CharacterPagination;
