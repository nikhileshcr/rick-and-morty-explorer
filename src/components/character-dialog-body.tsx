import { Box, Text } from "@chakra-ui/react";
import startcase from "lodash.startcase";

import CharacterCardImage from "./character-card-image";
import { Character, DisplayCharacter } from "@/types/chatacter";

/**
 * CharacterDialogBody Component
 *
 * This component displays detailed character information inside a dialog.
 * It features:
 * - Character image
 * - Key attributes (status, gender, location, species, episodes count)
 * - Responsive layout for different screen sizes
 */
const CharacterDialogBody = ({ character }: { character: Character }) => {
  // Prepare character details for display
  const displayCharacter: DisplayCharacter = {
    name: character.name,
    status: character.status,
    gender: character.gender,
    species: character.species,
    totalEpisode: character.episode.length,
    location: character.location.name,
  };

  return (
    <Box display="flex" flexDirection={{ base: "column", lg: "row" }}>
      {/* Character Image Section */}
      <Box
        w={{ base: "100%", lg: "40%" }}
        minH="80"
        display="flex"
        justifyContent="center"
      >
        <CharacterCardImage character={character} onlyImage={true} />
      </Box>

      {/* Character Details Section */}
      <Box w={{ base: "100%", lg: "60%" }}>
        {Object.entries(displayCharacter).map(([key, value], i) => (
          <Box key={i} display="flex" h="8" mb="2">
            <Text fontWeight="extrabold" color="blackAlpha.900">
              {startcase(key)}:&nbsp;
            </Text>
            <Text color="blackAlpha.900">{value}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CharacterDialogBody;
