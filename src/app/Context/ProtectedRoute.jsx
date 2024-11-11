"use client"

import { createContext, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
export const  ProtectedRoute = createContext();
export const ProtectedRouteProvider = ({children}) => {
    const { currentUser } = useContext(AuthContext)
    const ProtectRoute = ({ children }) =>{
        if(!currentUser){
          return <Navigate to="/Login"/>
        }
        
        return children
      };
      return (
        <ProtectRoute.Provider value={{ProtectRoute}}>
            {children}
        </ProtectRoute.Provider>
    );
}


 