import { IconType } from "react-icons";

export type UserData = {
  name: string;
  jobTitle: string;
};

export type UserDataContextType = {
  userData: UserData | null;
  saveStatePersistent: (data: UserData | null) => void;
  localStorageHasUserData: () => boolean | void;
};

export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  icon: IconType;
  name: "name" | "jobTitle"; // Explicitly define possible names
}
