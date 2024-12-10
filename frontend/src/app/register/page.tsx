'use client';

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

  const onSubmit = async (
    values: RegistrationFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await fetch(
        "http://localhost:5000/routes/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-black relative">
      {/* Logo */}
      <div className="absolute top-2 left-2">
        <Logo width={200} height={200} className="rounded-lg" />
      </div>

      {/* Welcome Text */}
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Create Your OptiMotion Account
      </h1>

      {/* Form Container */}
      <div className="w-full max-w-md p-6 bg-darkgrey rounded-lg shadow-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className="space-y-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-lightblue"
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 mt-2 border border-lightblue rounded-lg bg-background text-white focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                  placeholder="Your Name"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-lightblue"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 mt-2 border border-lightblue rounded-lg bg-background text-white focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                  placeholder="Your Email Address"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Age Dropdown */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-lightblue"
                >
                  Age
                </label>
                <Field
                  as="select"
                  id="age"
                  name="age"
                  className="w-full px-4 py-2 mt-2 border border-lightblue rounded-lg bg-background text-white focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                >
                  <option value="">Select your age</option>
                  {Array.from({ length: 90 }, (_, i) => 10 + i).map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="age"
                  component="p"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-lightblue"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 mt-2 border border-lightblue rounded-lg bg-background text-white focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                  placeholder="Your Password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-lightblue"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-4 py-2 mt-2 border border-lightblue rounded-lg bg-background text-white focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                  placeholder="Confirm Your Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 text-white bg-lightblue rounded-lg hover:bg-orange transition-all focus:outline-none focus:ring-2 focus:ring-lightblue"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>

        {/* Already Registered */}
        <p className="mt-6 text-sm text-center text-white">
          Already have an account?{" "}
          <a href="/login" className="hover:text-orange transition-all text-lightblue">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
