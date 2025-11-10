import { useContext } from "react";
import { CommentsContext } from "../../providers/CommentsProvider.jsx";

export default function Dashboard() {
  const { comments, setComments } = useContext(CommentsContext);

  return (
    <>
      <h1>Dashboard Page</h1>
    </>
  );
}
