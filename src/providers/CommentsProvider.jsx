import { createContext, useState } from "react";

export const CommentsContext = createContext();

export function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);

  return (
    <CommentsContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentsContext.Provider>
  );
}
