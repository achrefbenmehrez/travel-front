"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UserSignUpForm = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), "null"], "Passwords must match")
        .required("Please confirm your password"),
      phoneNumber: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_AUTH_API_URL + "/api/v1/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );

        if (response.ok) {
          toast.success("Sign up successful! Please log in.");
          resetForm();
          router.push("/login");
        } else {
          const errorData = await response.json();
          toast.error("Signup failed , verify your data.");
          console.error("Failed to sign up:", errorData.message);
        }
      } catch (error: any) {
        toast.error("Signup failed , verify your data.");
        console.error("Failed to sign up:", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-6">
      <label className="block">
        <span>First Name</span>
        <Input
          type="text"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-500">{formik.errors.firstName}</div>
        ) : null}
      </label>

      <label className="block">
        <span>Last Name</span>
        <Input
          type="text"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-red-500">{formik.errors.lastName}</div>
        ) : null}
      </label>

      <label className="block">
        <span>Email</span>
        <Input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
      </label>

      <label className="block">
        <span>Password</span>
        <Input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}
      </label>

      <label className="block">
        <span>Confirm Password</span>
        <Input
          type="password"
          name="passwordConfirmation"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation ? (
          <div className="text-red-500">
            {formik.errors.passwordConfirmation}
          </div>
        ) : null}
      </label>

      <label className="block">
        <span>Phone Number</span>
        <Input
          type="text"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div className="text-red-500">{formik.errors.phoneNumber}</div>
        ) : null}
      </label>

      <ButtonPrimary type="submit" disabled={formik.isSubmitting}>
        Sign Up
      </ButtonPrimary>
    </form>
  );
};

export default UserSignUpForm;
