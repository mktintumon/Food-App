import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
export const AuthContext = React.createContext();
//custom hook that allows components to access context data
export function useAuth() {
    return useContext(AuthContext)
}
// sync -> if you have a user or not on login and logout 
// It also exposes you lossley coupled auth functions
// 
function AuthProvider({ children }) {
    // const history = useHistory();
    const [user, userSet] = useState("");
    const [loading, setLoading] = useState(false);
    
    async function signUp(name, password, email, confirm) {
        try {
            setLoading(true);
            console.log("signup will be here");
            let res = await axios.post
                ("/api/v1/auth/signup", {
                    name: name,
                    password: password,
                    confirmPassword: confirm,
                    email
                })
            if(res.status == 400){
                alert("invalid entry")
            }
            setLoading(false);

        } catch (err) {
            console.log("err", err.message);
            setLoading(false);
        }
    }
    async function login(email, password) {
        try {
            setLoading(true);
            const res = await axios.post("/api/v1/auth/login", {
                email: email,
                password: password
            });

            if(res.status == 404){
                alert("Email or password not found")
            }
            else if(res.status == 400){
                alert("user Not found kindly login ")
            }
            else if(res.status == 500){
                alert("Internal Server Error")
            }
            else{
                setLoading(false);
                userSet(res.data.user);
            }
        }
        catch (err) {
            console.log(err);
            setLoading(false);
        }
        console.log("login will be here");
    }
    function logout() {
        // localStorage.removeItem("user")
        // userSet(null);
        console.log("logout will come here");
    }

    const value = {
        user,
        login,
        signUp,
        logout
    }
    return (
        < AuthContext.Provider value={value} >
            {/* if not loading show childrens  */}
            {!loading && children}
        </AuthContext.Provider >
    )
}
export default AuthProvider
