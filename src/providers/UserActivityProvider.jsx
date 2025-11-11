import { createContext, useState } from "react";

export const UserActivityContext = createContext();

export function UserActivityProvider({ children }) {
  const [UserActivity, setUserActivity] = useState({
    posts: [],
    comments: [],
  });

  return (
    <>
      <UserActivityContext.Provider value={{ UserActivity, setUserActivity }}>
        {children}
      </UserActivityContext.Provider>
    </>
  );
}
