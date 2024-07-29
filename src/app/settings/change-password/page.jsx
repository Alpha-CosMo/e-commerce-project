"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import MyPasswordInput from "@/components/MyPasswordInput";

const ChangePassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (values, actions) => {
    setIsSubmitting((prev) => !prev);

    //! Delete Timeout fn then handle POST Operation Here
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
      //! Reset submit status after POST operation is completed
      setIsSubmitting((prev) => !prev);
    }, 400);
  };

  return (
    <>
      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={Yup.object({
          oldPassword: Yup.string().required("Required"),
          newPassword: Yup.string()
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
            )
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
          confirmNewPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Please confirm your password"),
        })}
        onSubmit={handleSubmit}
      >
        <Form className="flex w-[70%] mx-auto flex-col gap-5 p-6">
          <MyPasswordInput
            label="Old Password"
            name="oldPassword"
            id="oldPassword"
            placeholder="Enter Old Password"
          />

          <MyPasswordInput
            label="New Password"
            name="newPassword"
            id="newPassword"
            placeholder="Enter New Password"
          />

          <MyPasswordInput
            label="Confirm New Password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            placeholder="Confirm New Password"
          />
          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving Changes.." : "Change Password"}
          </button>
        </Form>
      </Formik>
    </>
  );
};
export default ChangePassword;
