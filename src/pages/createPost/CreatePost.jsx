import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../providers/CurrentUserProvider";

export default function CreatePost() {
  const navigator = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!currentUser) {
    }
  }, []);

  return (
    <>
      <h1>Welcome User</h1>
    </>
  );
}
