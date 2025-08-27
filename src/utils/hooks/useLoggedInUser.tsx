import { useState, useEffect } from "react";

interface User {
  id?: string;
  name?: string;
  email?: string;
  // Add other user properties as needed
}

const useLoggedInUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return user;
};

export default useLoggedInUser;
