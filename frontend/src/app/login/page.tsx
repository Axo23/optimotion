"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Logo from "@/components/logo";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("This field is required"),
    password: Yup.string().required("Please enter your password"),
  });

  const onSubmit = async (values: LoginFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const response = await fetch("http://localhost:5000/routes/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (response.ok) {
        alert("Login successful!");
        router.push("/chat");
      } else {
        const data = await response.json();
        alert(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative">
      <div className="absolute top-2 left-2">
        <Logo width={200} height={200} className="rounded-lg" />
      </div>
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Welcome to OptiMotion</h1>
      <div className="w-full max-w-md p-6 bg-darkgrey rounded-lg shadow-lg">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-lightblue">
                  Email
                </label>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 mt-2 border border-lightblue rounded-lg bg-background text-lightblue focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="p" className="text-sm text-orange mt-1" />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-lightblue">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 mt-2 border border-lightblue rounded-lg bg-background text-lightblue focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                  placeholder="Your Password"
                />
                <ErrorMessage name="password" component="p" className="text-sm text-orange mt-1" />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 mt-4 text-white bg-orange rounded-lg hover:bg-lightblue transition-all focus:outline-none focus:ring-2 focus:ring-lightblue"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-6 text-sm text-center text-white">
          Don&apos;t have an account yet?{" "}
          <a href="/register" className="hover:text-orange transition-all text-lightblue">
            Register here!
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
