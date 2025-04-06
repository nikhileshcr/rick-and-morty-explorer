"use client";
// Client-side component for displaying paginated character information

// Core React and Next.js imports
import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Chakra UI components for layout and styling
import { Box, SimpleGrid, Tag, Image, Text } from "@chakra-ui/react";

// Apollo Client for GraphQL data fetching
import { useQuery } from "@apollo/client";

// Application components and utilities
import CharacterDialog from "@/components/character-dialog";
import CharacterPagination from "@/components/character-pagination";
import { GET_CHARACTERS } from "@/constants/queries";
import { Character } from "@/types/chatacter";
import GlobalSpinner from "@/components/spinner";
// import { useUserData } from "@/context/user-data";
import { CHARACTER_HEADING, NO_DATA_FOUND } from "@/constants/general-messages";

/**
 * Information Component
 *
 * Main page displaying paginated list of Rick & Morty characters with:
 * - User Information checks
 * - Pagination controls
 * - Character detail dialogs
 * - Responsive grid layout
 */

function InformationWrapper() {
  return (
    <Suspense fallback={<GlobalSpinner />}>
      <InformationContent />
    </Suspense>
  );
}

function InformationContent() {
  // Next.js navigation hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * User Information and Pagination Effect
   * Handles:
   * 1. Default page parameter setup
   * 2. User Information verification
   * 3. Local storage validation
   */
  useEffect(() => {
    // Set default page if missing
    if (searchParams.get("page") === null) {
      router.push(`?page=1`);
    }
  }, [searchParams, router]);

  // Get current page from URL parameters
  const currentPage = parseInt(searchParams.get("page") as string, 10);

  /**
   * Character Data Fetching
   * Uses Apollo Client to query characters with:
   * - Dynamic pagination
   * - Information-based skip control
   */
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { pageNo: currentPage },
  });

  // Loading state handling
  if (loading) return <GlobalSpinner />;

  // Calculate pagination metrics
  const totalCharacters = data?.characters?.info?.count || 0;
  const totalPages = Math.ceil(totalCharacters / 20);

  // Error state handling
  if (error)
    return <Tag.Root colorScheme="red.500">Error: {error.message}</Tag.Root>;

  // check if data is empty
  const checkIfNoData = () => {
    return data.characters.results.length === 0;
  };
  /**
   * Main Component Render
   * Conditionally renders after data load with:
   * - Brand logo
   * - Page title
   * - Top/bottom pagination
   * - Responsive character grid
   */
  return (
    !loading &&
    data && (
      <Box p={8} maxW="container.xl" mx="auto">
        {/* Brand Logo Section */}
        <Box display="flex" justifyContent="center" mb="5" mt="12">
          <Image
            src="images/logo.png"
            alt="Rick and Morty logo"
            aria-label="Series logo"
          />
        </Box>

        {/* Header Section with Title and Pagination */}
        {!checkIfNoData() && (
          <Box
            display="flex"
            flexDirection={{ base: "column", lg: "row" }}
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center">
              <Text
                color={"gray.200"}
                textAlign="center"
                fontSize="larger"
                fontWeight="bolder"
                role="heading"
                aria-level={2}
              >
                {CHARACTER_HEADING}
              </Text>
            </Box>
            <CharacterPagination
              totalCharacters={totalCharacters}
              totalPages={totalPages}
              currentPage={currentPage}
              loading={loading}
            />
          </Box>
        )}

        {/* Responsive Character Grid */}
        <SimpleGrid
          columns={[1, 2, 3, 4, 5]}
          gap={6}
          role="list"
          aria-label="Character list"
        >
          {data.characters.results.map((character: Character) => (
            <CharacterDialog
              key={character.id}
              character={character}
              aria-label={`Character ${character.name} details`}
            />
          ))}
        </SimpleGrid>
        {checkIfNoData() && (
          <Box
            maxW="2xl"
            bg="blackAlpha.800"
            p={8}
            borderRadius="xl"
            border="2px solid"
            borderColor="teal.400"
            boxShadow="xl"
            margin="auto"
            mt="10"
          >
            <Text>{NO_DATA_FOUND}</Text>
          </Box>
        )}

        {/* Bottom Pagination */}
        {!checkIfNoData() && (
          <CharacterPagination
            totalCharacters={totalCharacters}
            totalPages={totalPages}
            currentPage={currentPage}
            loading={loading}
          />
        )}
      </Box>
    )
  );
}

export default function Information() {
  return (
    <Suspense fallback={<GlobalSpinner />}>
      <InformationWrapper />
    </Suspense>
  );
}
