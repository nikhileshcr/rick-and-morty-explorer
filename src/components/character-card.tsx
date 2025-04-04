import { Box, Card, CardBody, Flex, Tag, Text } from "@chakra-ui/react";

import CharacterCardImage from "./character-card-image";

import { Character } from "@/types/chatacter";
import { getColor } from "@/constants/utilities";
import { LAST_KNOWN_LOCATION } from "@/constants/general-messages";

/**
 * CharacterCard Component
 *
 * Displays a styled character card with:
 * - Character image (with hover effects)
 * - Name and details (species, gender, status)
 * - Last known location
 * - Dynamic tag colors based on character attributes
 *
 * @param {Character} character - The character data to display.
 */
const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <Card.Root
      key={character.id}
      border="none"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      _hover={{
        transform: "scale(1.025)",
        transition: "0.5s",
      }}
      backgroundColor={"rgb(23,25,28)"} // Dark-themed card background
      cursor="pointer"
      height="100%"
    >
      {/* Character Image Section */}
      <Box position="relative">
        <CharacterCardImage character={character} onlyImage={false} />
      </Box>

      <CardBody>
        {/* Character Name */}
        <Text
          as="h3"
          mb={2}
          fontWeight="bolder"
          color="whiteAlpha.900"
          fontSize="125%"
        >
          {character.name}
        </Text>

        {/* Character Details: Species, Gender, Status */}
        <Flex gap={2} flexWrap="wrap" mb={3}>
          <Tag.Root colorPalette="teal">{character.species}</Tag.Root>
          <Tag.Root colorPalette="purple">{character.gender}</Tag.Root>
          <Tag.Root colorPalette={getColor(character.status)}>
            {character.status}
          </Tag.Root>
        </Flex>

        {/* Character Location */}
        <Text fontSize="sm" color="gray.200">
          {LAST_KNOWN_LOCATION}&nbsp;{character.location.name}
        </Text>
      </CardBody>
    </Card.Root>
  );
};

export default CharacterCard;
