import { Box, Image } from "@chakra-ui/react";
import { Character } from "@/types/chatacter";

/**
 * CharacterCardImage Component
 *
 * Displays a character's image with optional styling and hover effects.
 * - If `onlyImage` is true, it renders just the image.
 * - If `onlyImage` is false, it renders a styled image with a blurred background.
 *
 * @param {Character} character - Character object containing image and name.
 * @param {boolean} onlyImage - Flag to determine whether to render only the image or the full styled card.
 */
const CharacterCardImage = ({
  character,
  onlyImage,
}: {
  character: Character;
  onlyImage: boolean;
}) => {
  return !onlyImage ? (
    <Box>
      {/* Foreground Character Image with Hover Effect */}
      <Image
        position="absolute"
        zIndex="2"
        src={character.image}
        alt={character.name}
        objectFit="cover"
        h={["200px", "250px"]}
        w="100%"
        p="1.5"
        borderRadius={{ base: "1em", lg: "49% 51% 84% 16% / 73% 37% 63% 27%" }}
        transition="border-radius 500ms ease-in-out"
        _hover={{ borderRadius: "10%" }}
      />

      {/* Background Blurred Image */}
      <Box
        position="relative"
        width="100%"
        h={["200px", "250px"]}
        borderRadius="lg"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundImage={`url(${character.image})`}
        backgroundSize="cover"
        backgroundPosition="center"
        filter="blur(20px)"
      >
        <Image
          src={character.image}
          alt={character.name}
          objectFit="cover"
          h={["200px", "250px"]}
          w="100%"
          position="absolute"
          zIndex="1"
        />
      </Box>
    </Box>
  ) : (
    // Simple Character Image (Only Image Mode)
    <Image
      src={character.image}
      alt={character.name}
      objectFit="cover"
      position="absolute"
      zIndex="1"
      borderRadius="lg"
    />
  );
};

export default CharacterCardImage;
