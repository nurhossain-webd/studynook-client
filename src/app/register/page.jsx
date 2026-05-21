"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
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
import { useEffect } from "react";

const RegisterPage = () => {
    const router = useRouter();

    useEffect(() => {
        document.title = "StudyNook – Register";
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const password = userData.password;

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter");
            return;
        }

        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter");
            return;
        }

        try {
            const { data, error } = await authClient.signUp.email({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                image: userData.photoURL,
            });

            if (error) {
                toast.error(error.message || "Registration failed");
                return;
            }

            toast.success("Registration successful! Please login.");
            router.push("/login");
        } catch (error) {
            console.log(error);
            toast.error("Registration failed");
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            console.log(error);
            toast.error("Google registration failed");
        }
    };

    return (
        <section className="min-h-screen bg-[#F8F5EF] px-4 py-16 flex items-center justify-center">
            <div className="w-full max-w-md bg-white border border-[#E5E1D8] rounded-3xl shadow-sm p-8">
                <div className="text-center mb-8">
                    <p className="text-[#2F855A] font-semibold mb-2">
                        Create Account
                    </p>

                    <h1 className="text-3xl font-bold text-[#102A43]">
                        Register for StudyNook
                    </h1>

                    <p className="text-[#64748B] mt-3">
                        Join StudyNook to list rooms and manage your bookings.
                    </p>
                </div>

                <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
                    <TextField isRequired name="name" type="text">
                        <Label className="text-[#102A43] font-medium">Name</Label>
                        <Input
                            placeholder="Enter your name"
                            className="border border-[#E5E1D8] rounded-xl px-4 py-3"
                        />
                        <FieldError />
                    </TextField>

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

                    <TextField name="photoURL" type="text">
                        <Label className="text-[#102A43] font-medium">Photo URL</Label>
                        <Input
                            placeholder="https://example.com/photo.jpg"
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
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Password must contain at least one lowercase letter";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-[#102A43] font-medium">Password</Label>
                        <Input
                            placeholder="Create a password"
                            className="border border-[#E5E1D8] rounded-xl px-4 py-3"
                        />
                        <Description className="text-[#64748B]">
                            Minimum 6 characters with uppercase and lowercase letters.
                        </Description>
                        <FieldError />
                    </TextField>

                    <Button
                        type="submit"
                        className="w-full bg-[#2F855A] text-white rounded-full py-3 font-semibold hover:bg-[#276749] transition flex items-center justify-center gap-2"
                    >
                        <Check width={18} height={18} />
                        Register
                    </Button>
                </Form>

                <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className="w-full mt-4 border border-[#2F855A] text-[#2F855A] rounded-full py-3 font-semibold hover:bg-[#2F855A] hover:text-white transition"
                >
                    Continue with Google
                </button>

                <p className="text-center text-[#64748B] mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#2F855A] font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default RegisterPage;