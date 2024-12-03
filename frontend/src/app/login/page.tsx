"use client";

import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from 'next/image';

interface LoginFormValues {
  emailOrUsername: string;
  password: string;
}

const Login: React.FC = () => {
  const initialValues: LoginFormValues = {
    emailOrUsername: "",
    password: "",
  };

  const validationSchema = Yup.object({
    emailOrUsername: Yup.string()
      .required("This field is required"),
    password: Yup.string()
      .required("Please enter your password"),
  });

  const onSubmit = (values: LoginFormValues) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative">
      {/* Logo */}
      <div className="absolute top-5 left-5">
        <Image
          src="/images/optimotion-logo.png"
          alt="OptiMotion Logo"
          width={48}
          height={48} // Ensure to define width and height
          priority // Ensures this image loads early for performance
          className="w-12 h-12"
        />
      </div>

      {/* Welcome Text */}
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Welcome to OptiMotion
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
              {/* Username/Email Input */}
              <div>
                <label
                  htmlFor="emailOrUsername"
                  className="block text-sm font-medium text-lightblue"
                >
                  Username or Email
                </label>
                <Field
                  type="text"
                  id="emailOrUsername"
                  name="emailOrUsername"
                  className="w-full px-4 py-2 mt-2 border border-lightblue rounded-lg bg-background text-lightblue focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                  placeholder="Username or Email"
                />
                <ErrorMessage
                  name="emailOrUsername"
                  component="p"
                  className="text-sm text-orange mt-1"
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
                  className="w-full px-4 py-2 mt-2 border border-lightblue rounded-lg bg-background text-lightblue focus:outline-none focus:ring-2 focus:ring-lightblue focus:border-transparent"
                  placeholder="Your Password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-sm text-orange mt-1"
                />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 text-white bg-orange rounded-lg hover:bg-lightblue transition-all focus:outline-none focus:ring-2 focus:ring-lightblue"
              >
                Log In
              </button>
            </Form>
          )}
        </Formik>

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <a
            href="/forgot-password"
            className="text-sm text-lightblue hover:text-orange transition-all"
          >
            Forgot Password?
          </a>
        </div>

        {/* Sign Up */}
        <p className="mt-6 text-sm text-center text-lightblue">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="hover:text-orange transition-all"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
