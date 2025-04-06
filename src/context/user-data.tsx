"use client";

import { UserData } from "@/types/user";

export function useUserData() {
  const saveData = (data: UserData | null) => {
    // Set cookie with expiration (7 days)
    if (!data) {
      document.cookie =
        "userData=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }
    document.cookie = `userData=${JSON.stringify(data)}; path=/; max-age=${
      7 * 24 * 60 * 60
    }`;
  };

  const getData = () => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userData="));
    return cookie ? JSON.parse(cookie.split("=")[1]) : null;
  };

  return { saveData, getData };
}
