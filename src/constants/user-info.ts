import { FormField } from "@/types/user";
import { LuUser, LuBuilding } from "react-icons/lu";

export const formFields: FormField[] = [
  {
    id: "name",
    label: "Name",
    placeholder: "Enter your name",
    icon: LuUser,
    name: "name" as const,
  },
  {
    id: "job-title",
    label: "Job Title",
    placeholder: "Enter your job title",
    icon: LuBuilding,
    name: "jobTitle" as const,
  },
];
