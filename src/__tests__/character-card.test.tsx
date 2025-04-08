import "@testing-library/jest-dom";
import "core-js/stable/structured-clone";
import { render, screen } from "@testing-library/react";
import CharacterCard from "@/components/character-card";
import { Character } from "@/types/chatacter";
import { system } from "@/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider value={system}>{children}</ChakraProvider>;
};

const mockCharacter: Character = {
  id: "1",
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  gender: "",
  origin: {
    name: "",
  },
  location: {
    name: "",
  },
  episode: [],
};

describe("Page", () => {
  it("renders a heading", () => {
    render(<CharacterCard character={mockCharacter} />, {
      wrapper: AllTheProviders,
    });

    // Test for name
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();

    // Test for status & species combination
    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();

    // Test for image
    const image = screen.getAllByAltText(mockCharacter.name);
    expect(image[0]).toHaveAttribute("src", mockCharacter.image);
    expect(image[0]).toHaveAttribute("alt", mockCharacter.name);
  });
});
