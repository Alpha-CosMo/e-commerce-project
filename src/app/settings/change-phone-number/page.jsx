"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import MyTextInput from "@/components/MyTextInput";
import Link from "next/link";

const ChangeNumber = () => {
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
          phoneNumber: "",
        }}
        validationSchema={Yup.object({
          phoneNumber: Yup.string()
            .required("Required")
            .length(11, "Must be 11 characters")
            .matches(/^\d+$/, "Must be a number"), // Ensures the string contains only digits
        })}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5 p-6">
          <MyTextInput label="Phone Number" name="phoneNumber" type="tel" />

          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Changing Phone Number..." : "Change Phone Number"}
          </button>
        </Form>
      </Formik>
    </>
  );
};
export default ChangeNumber;
