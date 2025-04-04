"use client";

// Component for collecting/updating user information with animated UI and validation
import {
  Box,
  Button,
  Field,
  Input,
  InputGroup,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Application state and routing dependencies
import { useUserData } from "@/context/user-data";
import { useRouter } from "next/navigation";
import { formFields } from "@/constants/user-info";
import { CANNOT_BE_BLANK, DELETE, SAVE } from "@/constants/general-messages";

export default function UserInfo() {
  // State Management
  const [formData, setFormData] = useState({ name: "", jobTitle: "" });
  const [errorState, setErrorState] = useState({
    name: false,
    jobTitle: false,
  });
  const [showDelete, setShowDelete] = useState(false); // Controls delete button visibility
  const [loading, setLoading] = useState(true); // Loading state for initial data check

  // Context and Routing
  const { userData, saveStatePersistent, localStorageHasUserData } =
    useUserData();
  const router = useRouter();

  /**
   * Initialization Effect
   * Handles:
   * - Loading existing user data from context
   * - Setting initial form values
   * - Verifying localStorage existence
   */
  useEffect(() => {
    if (userData && localStorageHasUserData()) {
      setFormData({
        name: userData.name,
        jobTitle: userData.jobTitle,
      });
      setShowDelete(true); // Enable delete for existing users
    }
    setLoading(false); // Complete initial load
  }, [userData]);

  /**
   * Handles input changes and updates form state
   * @param e - React change event from input fields
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Form Submission Handler
   * - Validates required fields
   * - Saves data to persistent storage
   * - Navigates to information page
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrorState = { name: false, jobTitle: false };

    // Validate required fields
    formFields.forEach((field) => {
      newErrorState[field.name] = formData[field.name].trim().length === 0;
    });

    setErrorState(newErrorState);

    // Proceed if no errors
    if (!Object.values(newErrorState).some(Boolean)) {
      saveStatePersistent(formData);
      router.push("/information?page=1");
    }
  };

  /**
   * Data Deletion Handler
   * - Clears persisted user data
   * - Resets form state
   */
  const handleDelete = () => {
    saveStatePersistent(null);
    setFormData({ name: "", jobTitle: "" });
    setShowDelete(false);
  };

  return (
    <Box
      as={motion.div}
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      background="url('images/black-space-background.jpg') no-repeat"
      backgroundPosition="50% 50%"
      backgroundSize="150%"
    >
      {/* Main Content Container */}
      <Box
        h="100%"
        w="100%"
        position="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/* Decorative Portal Gun Image (Desktop Only) */}
        <Box
          w="50%"
          h="65%"
          position="absolute"
          left="6%"
          bottom="15%"
          background="url('images/rick_portal_gun.png') no-repeat"
          visibility={{ base: "hidden", sm: "hidden", lg: "visible" }}
          zIndex="1"
        />

        {/* Form Container */}
        <Box
          as={motion.div}
          background="white"
          p={8}
          borderRadius="md"
          boxShadow="lg"
          width={{ base: "90%", sm: "400px" }}
          zIndex="2"
        >
          {/* Dynamic Form Fields */}
          {formFields.map((field) => (
            <Field.Root
              key={field.id}
              id={field.id}
              mb={4}
              required
              invalid={errorState[field.name]}
            >
              <Field.Label fontSize="lg" color="blackAlpha.900">
                {field.label} <Field.RequiredIndicator />
              </Field.Label>

              {/* Input Group with Loading State */}
              <Box
                display="flex"
                flexDirection="row"
                w="100%"
                alignItems="center"
              >
                <InputGroup startElement={<field.icon />} w="90%">
                  <Input
                    name={field.name}
                    type="text"
                    placeholder={field.placeholder}
                    variant="flushed"
                    value={formData[field.name]}
                    onChange={handleChange}
                    disabled={loading}
                    aria-label={`Enter ${field.label.toLowerCase()}`}
                    color="blackAlpha.900"
                  />
                </InputGroup>
                {loading && <Spinner size="sm" ml="2" aria-label="Loading" />}
              </Box>

              <Field.ErrorText role="alert">
                {field.label}&nbsp;{CANNOT_BE_BLANK}
              </Field.ErrorText>
            </Field.Root>
          ))}

          {/* Action Buttons */}
          <Box display="flex" w="100%">
            <Button
              as={motion.button}
              colorScheme="teal"
              width={showDelete ? "50%" : "100%"}
              mr={2}
              onClick={handleSubmit}
              aria-label="Save user information"
            >
              {SAVE}
            </Button>
            {showDelete && (
              <Button
                as={motion.button}
                backgroundColor="red.400"
                width="50%"
                onClick={handleDelete}
                aria-label="Delete user information"
              >
                {DELETE}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
