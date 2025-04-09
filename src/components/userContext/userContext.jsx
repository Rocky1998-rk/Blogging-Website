import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [editBlogData, setEditBlogData] = useState(null);
    console.log('dataUser', user)   

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const { id } = JSON.parse(atob(token.split('.')[1])); 
                
                const response = await axios.get(`http://localhost:3000/api/getUserData/${id}`, { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
               });

               setUser(response.data.existingUser);
               console.log("User Data:", response.data.existingUser);
                
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchUserData();

    }, []);
    

    return (
        <userContext.Provider value={{ user, editBlogData, setEditBlogData}}>
            {children}
        </userContext.Provider>
    );

};