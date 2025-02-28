import {createContext} from "react";

interface User {
  userId?: string
}

// @ts-ignore
export const UserContext = createContext<User>(null)
