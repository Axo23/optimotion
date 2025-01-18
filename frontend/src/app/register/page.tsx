"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Logo from "@/components/logo";
import { RegistrationFormValues } from "@/interfaces";

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
    <div className="min-h-screen bg-background text-tertiary flex flex-col items-center justify-center">
      <Logo width={150} height={150} />
      <div className="max-w-md w-full bg-secondary shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Register</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-xl font-medium text-tertiary">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="w-full mt-1 p-2 border border-primary rounded-md bg-background text-tertiary"
                />
                <ErrorMessage name="name" component="p" className="text-sm text-tertiary mt-1" />
              </div>
              <div>
                <label className="block text-xl font-medium text-tertiary">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full mt-1 p-2 border border-primary rounded-md bg-background text-tertiary"
                />
                <ErrorMessage name="email" component="p" className="text-sm text-tertiary mt-1" />
              </div>
              <div>
                <label className="block text-xl font-medium text-tertiary">Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full mt-1 p-2 border border-primary rounded-md bg-background text-tertiary"
                />
                <ErrorMessage name="password" component="p" className="text-sm text-tertiary mt-1" />
              </div>
              <div>
                <label className="block text-xl font-medium text-tertiary">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="w-full mt-1 p-2 border border-primary rounded-md bg-background text-tertiary"
                />
                <ErrorMessage name="confirmPassword" component="p" className="text-sm text-tertiary mt-1" />
              </div>
              <div>
                <label className="block text-xl font-medium text-tertiary">Age</label>
                <Field
                  as="select"
                  name="age"
                  className="w-full mt-1 p-2 border border-primary rounded-md bg-background text-tertiary"
                >
                  <option value="">Select Age</option>
                  {Array.from({ length: 90 }, (_, i) => 10 + i).map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="age" component="p" className="text-sm text-tertiary mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-primary rounded-md hover:bg-tertiary transition-all text-background font-bold"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center text-lg text-tertiary">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:text-tertiary transition">
            Log In
          </a>
        </p>
      </div>
    </div>
  );  
};

export default Register;
