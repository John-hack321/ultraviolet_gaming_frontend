'use client'

import React, { createContext, useState, ReactNode, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Define your User type more clearly if possible
type User = any;

type AuthContextType = { // here we get o define what data or function the auth context will share across our application 
  user: User | null;
  login: ( username : string ,email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined); // the create context is used to create a context to share data accross our app ie. the logged in user 
// the definition of this up here also creates the actula context that we will use with createcontext 

export type AuthProviderProps = {
  children: ReactNode; // react node is a typescript type for children component in react 
};

// this auth provider defined down here now becomes a wraper that provides authentication to the entire app 
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null); // this hook defination we use it to track who is logged in 
  const router = useRouter(); // and just from general knowledge we use this to naviagate the website programticaly 

  const login = async (username : string , email: string, password: string) => {
    try { // what we are doing here inside this function is we are creating form data expected by the fastapi auth2 endpoint 
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('username' , username);
      // after creating the form data we send it to the actual endpoint using axios note : axios is used for sending and receiving http requests and more 
      const response = await axios.post('http://localhost:8000/auth/token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const accessToken = response.data.access_token; // this part now extracts the accessToken from the response from fastapi 
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // the token is then added to the header files for requests so that it can be addedd to all the outgoing requests 
      localStorage.setItem('token', accessToken); // we the store the token locally in the local storage , so that apart from being accessible on the headers it is alse accessible localy 
      setUser(response.data); // we the update the user variable in the useState hook with the user data from the response
      router.push('/page'); // we then redirect the user to the landing page or a relevant page after loggin in now 
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => { // this is now the logout functoin , which is also share across all of the app 
    setUser(null); // we begin by setting the usr to null so that there is no user currently logged in 
    delete axios.defaults.headers.common['Authorization']; // we the remove the token from the headers
    localStorage.removeItem('token'); // we also remove it from the local storage 
    router.push('/login'); // we then push the user to the login page 
  };

  return ( // and now this is the component that we now return which houses all of the login and logout logic and goes foward to share it across all of the components 
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
  
};

// Custom hook for using the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
