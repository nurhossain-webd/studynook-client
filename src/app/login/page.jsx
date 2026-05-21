"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check } from "@gravity-ui/icons";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";


const LoginPage = () => {

    useEffect(() => {

        document.title = "StudyNook – Login";

    }, []);
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
        });

        if (error) {
            toast.error(error.message || "Invalid email or password");
            return;
        }

        toast.success("Login successful");
        router.push("/");
        router.refresh();
    };
    const handleGoogleSignUp = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };


    return (
        <section className="min-h-screen bg-[#F8F5EF] px-4 py-16 flex items-center justify-center">
            <div className="w-full max-w-md bg-white border border-[#E5E1D8] rounded-3xl shadow-sm p-8">
                <div className="text-center mb-8">
                    <p className="text-[#2F855A] font-semibold mb-2">Welcome Back</p>

                    <h1 className="text-3xl font-bold text-[#102A43]">
                        Login to StudyNook
                    </h1>

                    <p className="text-[#64748B] mt-3">
                        Access your bookings, listings, and private study rooms.
                    </p>
                </div>

                <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-[#102A43] font-medium">Email</Label>
                        <Input
                            placeholder="john@example.com"
                            className="border border-[#E5E1D8] rounded-xl px-4 py-3"
                        />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 6) {
                                return "Password must be at least 6 characters";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-[#102A43] font-medium">Password</Label>
                        <Input
                            placeholder="Enter your password"
                            className="border border-[#E5E1D8] rounded-xl px-4 py-3"
                        />
                        <Description className="text-[#64748B]">
                            Use your registered StudyNook password.
                        </Description>
                        <FieldError />
                    </TextField>

                    <Button
                        type="submit"
                        className="w-full bg-[#2F855A] text-white rounded-full py-3 font-semibold hover:bg-[#276749] transition flex items-center justify-center gap-2"
                    >
                        <Check width={18} height={18} />
                        Login
                    </Button>
                </Form>

                <button onClick={handleGoogleSignUp} className="w-full mt-4 border border-[#2F855A] text-[#2F855A] rounded-full py-3 font-semibold hover:bg-[#2F855A] hover:text-white transition">
                    Continue with Google
                </button>

                <p className="text-center text-[#64748B] mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-[#2F855A] font-semibold">
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default LoginPage;