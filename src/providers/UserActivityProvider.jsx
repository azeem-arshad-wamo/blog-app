import { createContext, useState } from "react";

export const UserActivityContext = createContext();

export function UserActivityProvider({ children }) {
  const [UserActivity, setUserActivity] = useState([]);

  return (
    <>
      <UserActivityContext.Provider value={{ UserActivity, setUserActivity }}>
        {children}
      </UserActivityContext.Provider>
    </>
  );
}
