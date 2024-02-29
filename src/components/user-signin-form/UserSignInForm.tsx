"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const UserSignInForm = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response: any = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        console.log(response);

        if (response?.ok) {
          resetForm();
          router.push("/");
        }
      } catch (error: any) {
        console.log(error);
        console.error("Failed to sign up:", error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 gap-6">
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

      <ButtonPrimary type="submit" disabled={formik.isSubmitting}>
        Login
      </ButtonPrimary>
    </form>
  );
};

export default UserSignInForm;
