"use client";

import {
  Box,
  Flex,
  Link,
  useDisclosure,
  Stack,
  IconButton,
  Image,
} from "@chakra-ui/react";

import { usePathname } from "next/navigation";
import { LuMenu } from "react-icons/lu";

// Navigation links for the Navbar
const NavLinks = [
  { name: "Home", href: "/" },
  { name: "Characters", href: "/information" },
  { name: "User Information", href: "/userinfo" },
];

export default function Navbar() {
  const { open, onToggle } = useDisclosure(); // Hook for handling mobile menu open/close state
  const pathname = usePathname(); // Get the current page path

  return (
    <Box
      as="nav"
      position="fixed" // Keeps the navbar fixed at the top
      w="100%" // Full width
      top={0}
      zIndex={10} // Ensures it's above other elements
      boxShadow="sm"
      bg={{ base: "gray.200", sm: "gray.200", lg: "transparent" }} // Different background for mobile vs desktop
    >
      <Flex
        mx="auto"
        px={{ base: 4, md: 6 }}
        py={3}
        align="center"
        justify="space-between"
      >
        <Link href="/">
          {/* Logo for Desktop */}
          <Image
            src="images/as-white-logo.png"
            w="35%"
            alt="AS logo"
            display={{ base: "none", sm: "none", lg: "block" }} // Hidden on small screens
          ></Image>

          {/* Logo for Mobile */}
          <Image
            src="images/as-black-logo.png"
            w="35%"
            alt="AS logo"
            display={{ lg: "none" }} // Visible only on mobile
          ></Image>
        </Link>

        {/* Desktop Navigation Links */}
        <Flex display={{ base: "none", md: "flex" }} ml={10}>
          {NavLinks.map((link) => (
            <Link
              key={link.name}
              px={4}
              py={2}
              fontWeight="medium"
              href={link.href}
              color={pathname === link.href ? "blue.500" : "teal.600"} // Highlights active page
              borderBottom={pathname === link.href ? `2px solid` : "none"} // Underline active page
              borderColor={"teal.600"}
              _hover={{
                textDecoration: "none",
                color: "blue.500",
              }}
            >
              {link.name}
            </Link>
          ))}
        </Flex>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ md: "none" }} // Only visible on mobile
          onClick={onToggle} // Toggles mobile menu
          variant="ghost"
          size={"xl"}
          aria-label="Toggle Navigation"
        >
          <LuMenu color="black.900" />
        </IconButton>
      </Flex>

      {/* Mobile Navigation Menu */}
      {open && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack gap={4} px={4}>
            {NavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                p={2}
                fontWeight="medium"
                color={pathname === link.href ? "blue.500" : "teal.600"}
                borderLeft={pathname === link.href ? `2px solid` : "none"} // Left border for active page
                borderColor={"teal.600"}
                _hover={{
                  textDecoration: "none",
                  bg: "gray.50",
                }}
              >
                {link.name}
              </Link>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
