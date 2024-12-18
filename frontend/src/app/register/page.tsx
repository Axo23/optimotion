"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Logo from "@/components/logo";

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
}

const Register: React.FC = () => {
  const router = useRouter();
  const initialValues: RegistrationFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
    age: Yup.string().required("Age is required"),
  });

  const onSubmit = async (values: RegistrationFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const response = await fetch("http://localhost:5000/routes/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-lightblue flex flex-col items-center justify-center">
      <Logo width={150} height={150} />
      <div className="max-w-md w-full bg-gray-900 shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-xl font-medium">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
                <ErrorMessage name="name" component="p" className="text-sm text-red-500 mt-1" />
              </div>
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
              <div>
                <label className="block text-xl font-medium">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
                <ErrorMessage name="confirmPassword" component="p" className="text-sm text-red-500 mt-1" />
              </div>
              <div>
                <label className="block text-xl font-medium">Age</label>
                <Field
                  as="select"
                  name="age"
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                >
                  <option value="">Select Age</option>
                  {Array.from({ length: 90 }, (_, i) => 10 + i).map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="age" component="p" className="text-sm text-red-500 mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition-all text-white font-bold"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center text-lg">
          Already have an account?{" "}
          <a href="/login" className="text-lightblue hover:text-orange transition">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
