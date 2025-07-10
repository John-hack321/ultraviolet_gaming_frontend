import {z} from "zod";

export const signInSchema = z.object({
    username : z.string().min(3, 'username must be of altleast 3 characters'),
    password : z.string().min(6 , "Password must be atleast 6 characters "),
}
)

export const signUpSchema = z.object({
    username : z.string().min(6, " the username must be of atlease 6 characters "),
    email : z.string().email("invalid email"),
    password : z.string().min(6, "please enter a password , must be atleast 6 characters"),
})

// in order to use these schmeas we will have to export them 

export type signInFormValues = z.infer<typeof signInSchema>
export type SignUpFormValues = z.infer<typeof signUpSchema>

{/* 
    so aa seen zod is the best in handling user forms and doing everything form related 
    in the schemas folder we define the auth.ts file in which we define the schemas for our form and how they will be accepted 
    
     */}