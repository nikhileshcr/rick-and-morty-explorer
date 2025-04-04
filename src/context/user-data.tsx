import { UserData, UserDataContextType } from "@/types/user";
import { createContext, ReactNode, useContext, useState } from "react";

// Default values for the context to handle user data
const userDataContextDefault: UserDataContextType = {
  userData: {
    name: "",
    jobTitle: "",
  },
  saveStatePersistent: () => {},
  localStorageHasUserData: () => {},
};

// Create a context for user data
const UserDataContext = createContext<UserDataContextType>(
  userDataContextDefault
);

// Custom hook to use user data context
export function useUserData() {
  return useContext(UserDataContext);
}

type Props = {
  children: ReactNode;
};

// Provider component to wrap around the app and provide user data context
export function UserDataProvider({ children }: Props) {
  // Retrieve user data from localStorage, if available
  let userDataFromStorage;
  if (typeof window !== "undefined") {
    userDataFromStorage = localStorage.getItem("userData");
  }

  // Parse the retrieved data from localStorage
  if (userDataFromStorage) {
    userDataFromStorage = JSON.parse(userDataFromStorage);
  }

  // Initialize state with either localStorage data or empty values
  const [userData, setUserData] = useState<UserData | null>({
    name: userDataFromStorage ? userDataFromStorage.name : "",
    jobTitle: userDataFromStorage ? userDataFromStorage.jobTitle : "",
  });

  // Function to save or remove user data in localStorage and update state
  const saveStatePersistent = (data: UserData | null) => {
    if (data === null) {
      localStorage.removeItem("userData"); // Remove data from localStorage
      return;
    }
    setUserData(data); // Update state with new user data
    localStorage.setItem("userData", JSON.stringify(data)); // Save data in localStorage
  };

  // Check if user data exists in localStorage
  const localStorageHasUserData = () => {
    return localStorage.hasOwnProperty("userData");
  };

  // Context value to be provided to the app
  const value: UserDataContextType = {
    userData,
    saveStatePersistent,
    localStorageHasUserData,
  };

  return (
    // Providing the user data context to child components
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}
