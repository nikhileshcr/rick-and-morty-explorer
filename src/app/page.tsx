"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useUserData } from "@/context/user-data";
import { UserData } from "@/types/user";
import { RICK_TAG_LINE, SHOW_DESC } from "@/constants/general-messages";

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [route, setRoute] = useState("");
  const { getData } = useUserData();

  useEffect(() => {
    const userData: UserData | null = getData();
    if (!userData) {
      setRoute("/userinfo");
    } else {
      setRoute("/information");
    }

    if (currentIndex < SHOW_DESC.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + SHOW_DESC[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 40);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const checkInfoRoute = () => route == "/information";

  const handleSubmit = () => {
    router.push(route);
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgSize="cover"
      backgroundPosition="center"
      p={8}
    >
      <Box
        maxW="2xl"
        bg="blackAlpha.800"
        p={8}
        borderRadius="xl"
        border="2px solid"
        borderColor="teal.400"
        boxShadow="xl"
      >
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color="white"
          whiteSpace="pre-wrap"
          position="relative"
        >
          {displayText}
        </Text>

        {currentIndex >= SHOW_DESC.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Text
              mt={8}
              fontSize="xl"
              color="teal.400"
              textAlign="center"
              fontWeight="bold"
            >
              {RICK_TAG_LINE}
            </Text>
          </motion.div>
        )}
        {checkInfoRoute() && (
          <Text color="whiteAlpha.900" mt={16}>
            User info is available! Click below to exlore all the characters!
          </Text>
        )}
        <Button
          as={motion.button}
          colorScheme="teal"
          width="100%"
          size="lg"
          onClick={handleSubmit}
          mt="12"
        >
          {checkInfoRoute() ? "Explore" : "Get Started"}
        </Button>
      </Box>
    </Box>
  );
}
