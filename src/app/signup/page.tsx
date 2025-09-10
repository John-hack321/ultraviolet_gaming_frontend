'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { SignUpFormValues, signUpSchema } from "../schemas/auth";
import { useForm } from 'react-hook-form';
import { useAuth } from "../context/authContext";
import Link from "next/link";

export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { signup } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: SignUpFormValues) => {
        setIsLoading(true);
        setError(null);
        try {
            await signup(data.email, data.phone, data.password, data.username || "", data.chessDotComUsername || "");
            router.push('/dashboard');
        } catch (error) {
            console.error("Signup failed:", error);
            setError(error instanceof Error ? error.message : 'An error occurred during signup');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex min-h-screen w-full bg-white'>
            <div className='relative flex flex-col items-center justify-center w-full lg:w-1/2 p-4'>
                <div className='absolute left-4 top-4 md:left-8 md:top-6'>
                    <Link href="/" className='text-xl font-bold tracking-tight text-black'>
                        .ULVT_GAMERS
                    </Link>
                </div>

                <div className="w-full max-w-md p-6 md:p-8">
                    <h2 className="mb-6 text-center text-2xl font-semibold text-black">Create your account</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="text-sm text-gray-700 mb-1 block font-medium">Username</label>
                            <input type="text" id="username" placeholder="Enter your username" {...register("username")} className="w-full p-2.5 border border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:ring-blue-500 focus:outline-none focus:ring-1"/>
                            {errors.username && <p className="mt-1 text-red-500 text-xs">{errors.username.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="text-sm text-gray-700 mb-1 block font-medium">Email</label>
                            <input type="email" id="email" placeholder="Enter your email" {...register("email")} className="w-full p-2.5 border border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:ring-blue-500 focus:outline-none focus:ring-1"/>
                            {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="phone" className="text-sm text-gray-700 mb-1 block font-medium">Phone</label>
                            <input type="tel" id="phone" placeholder="Enter your phone number" {...register("phone")} className="w-full p-2.5 border border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:ring-blue-500 focus:outline-none focus:ring-1"/>
                            {errors.phone && <p className="mt-1 text-red-500 text-xs">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" placeholder="Enter your password" {...register("password")} className="w-full p-2.5 border border-gray-300 rounded-lg text-black placeholder:text-gray-500 focus:ring-blue-500 focus:outline-none focus:ring-1"/>
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={isLoading || !isValid}
                            className={`w-full rounded-lg py-2.5 text-sm font-bold text-center transition-colors ${isLoading || !isValid ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-black hover:bg-gray-800 text-white"}`}>
                            {isLoading ? 'Creating account...' : 'Sign Up'}
                        </button>

                        <div className="text-center">
                            <span className="text-gray-600 text-sm">Already have an account?
                                <Link href="/login" className="ml-2 underline text-blue-600 hover:text-blue-700">Sign In</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>

            <div className="hidden lg:flex items-center justify-center w-1/2 p-8 bg-gray-50">
                 <div className="w-full h-full rounded-3xl bg-gradient-to-b from-indigo-100 via-purple-100 to-[#5960d7] flex flex-col justify-between p-12">
                    <div className="flex-grow flex items-center justify-center">
                        <Image
                            src="/cod_actual.png"
                            alt="Chess game illustration"
                            width={400}
                            height={400}
                            className="rounded-lg"
                            priority
                        />
                    </div>
                    <div className="w-full max-w-lg">
                        <div className="mb-3 flex bg-indigo-100 w-fit rounded-2xl bg-opacity-40 px-3 py-1">
                            <span className="uppercase tracking-wider text-purple-950 text-xs font-medium">latest updates</span>
                        </div>
                        <h3 className="text-xl text-white font-semibold">Go to the tournaments sections and play completely anonymous tournaments with strangers from all over the world.</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
