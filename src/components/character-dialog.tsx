import { CloseButton, Dialog, Portal, Box } from "@chakra-ui/react";

import CharacterCard from "./character-card";
import CharacterDialogBody from "./character-dialog-body";

import { Character } from "@/types/chatacter";
import { getColor } from "@/constants/utilities";

/**
 * CharacterDialog Component
 *
 * This component renders a modal dialog displaying detailed information
 * about a character when their card is clicked.
 *
 * Features:
 * - Uses Chakra UI's `Dialog` for a modal interface.
 * - Displays character details inside the modal.
 * - Customizable backdrop and content styling based on character status.
 * - Includes a close button for user-friendly interaction.
 */
const CharacterDialog = ({ character }: { character: Character }) => {
  return (
    <Dialog.Root placement="center" size="xl">
      {/* Trigger: Character Card (Click to open dialog) */}
      <Dialog.Trigger asChild>
        <Box position="relative">
          <CharacterCard character={character} />
        </Box>
      </Dialog.Trigger>

      {/* Portal ensures modal is rendered outside the component tree */}
      <Portal>
        {/* Modal Backdrop (overlay background) */}
        <Dialog.Backdrop />

        {/* Modal Positioning and Content */}
        <Dialog.Positioner>
          <Dialog.Content
            m={5} // Margin around dialog
            backgroundColor={getColor(character.status) + ".100"} // Dynamic background based on character status
          >
            {/* Dialog Header */}
            <Dialog.Header>
              <Dialog.Title color="blackAlpha.950">
                {character.name}
              </Dialog.Title>
            </Dialog.Header>

            {/* Dialog Body: Displays character details */}
            <Dialog.Body>
              <CharacterDialogBody character={character} />
            </Dialog.Body>

            {/* Close Button */}
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CharacterDialog;
