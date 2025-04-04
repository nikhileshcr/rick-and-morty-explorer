import { Spinner, Box } from "@chakra-ui/react";

// GlobalSpinner component to display a loading spinner
export const GlobalSpinner = () => {
  return (
    <Box display="flex" w="100%" justifyContent="center" alignItems="center">
      {/* Spinner with extra-large size and cyan color */}
      <Spinner size="xl" mt={10} color="cyan.500" />
    </Box>
  );
};

export default GlobalSpinner;
