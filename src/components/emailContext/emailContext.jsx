import { createContext, useState } from "react";

export const emailContext = createContext();

export const EmailContextProvider = ({children}) => {

    const [userEmail, setUserEmail]= useState('');

     return(
        <emailContext.Provider value={{userEmail, setUserEmail}}>
            <>{children}</>
        </emailContext.Provider>
        
     ); 
    
};