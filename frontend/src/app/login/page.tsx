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
    <div className="min-h-screen bg-black text-lightblue flex flex-col items-center justify-center">
      <Logo width={150} height={150} />
      <div className="max-w-md w-full bg-gray-900 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-xl font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
                <ErrorMessage name="email" component="p" className="text-sm text-red-500 mt-1" />
              </div>
              <div>
                <label className="block text-xl font-medium">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
                <ErrorMessage name="password" component="p" className="text-sm text-red-500 mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 mt-2 bg-green-600 rounded-md hover:bg-green-700 transition-all text-white font-bold"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center text-lg">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-lightblue hover:text-orange transition">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
