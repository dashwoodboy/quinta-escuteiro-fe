import {getAuth, onAuthStateChanged} from "firebase/auth";
import {ReactElement, useContext, useEffect, useState} from "react";
import {UserContext} from "../Contexts/User";

type Props = {
  children?: ReactElement | ReactElement[]
}

export const UserProvider = ({ children }: Props) => {

  const [userId, setUserId] = useState<string | undefined>(undefined)

  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      console.log(currentUser)
      setUserId(currentUser?.uid)
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  });

  return (
    <UserContext.Provider value={{userId: userId}}>
      {children}
    </UserContext.Provider>
  )
};

export const useUser = () => useContext(UserContext);

