// so what we are doing here is we are defining a protective wrapper that will act as a security gate for routes in our 
// next js application 

'use client'

import {ReactNode,  useEffect} from 'react';
import { useRouter } from 'next/navigation';
import {  useAuth } from '../context/authContext'; // this is the custom hook that we implemented to access the authcontext in order to avoid errors too 

type ProtectedRouteProps = { // this defines the props that this component will accespt 
    children : ReactNode,
}

const ProtectedRoute = ({children} : ProtectedRouteProps ) => { // so what this function here does is that it checks if a user is logged in and if not it redirects them silently to the login page 
    const {user , loading} = useAuth(); // this comes from our global auth context if its null then we infer that the use is not logged in 
    const router = useRouter(); // just as known this is for programatic navigation of the site 

    useEffect(() => { // this runs after the initial render if the user is not authenticatd then it returns them to the login 
        if (!loading && !user) {
            router.push('/login');
        }
    },[user , loading , router]) // these are the dependancies that are checked to see if the use is logged in or not : 

    // though not a must we are going to add this spinner logic while we check the user 

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
            <svg
              className="animate-spin h-6 w-6  text-blue-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <span className="text-sm text-gray-600">Loading...</span>
          </div>
        )
    }

    return user ? children : null; // if ths user exits render the protected content ( children ) if not render nothing ( null )
};

export default ProtectedRoute;

// and just like that we will have created a protected route which will automaticaly logout a user from a page if they are not signed in 
// for usage this is how we use it no our code : 
{/* 


<ProtectedRoute>
   <UserProfile/>
</ProtectedRoute>


*/} // and thats how we use it as a componenet 
