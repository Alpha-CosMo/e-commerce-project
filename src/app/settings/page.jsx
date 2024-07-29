"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";

import MyTextInput from "@/components/MyTextInput";

const Settings = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schemaObject = Yup.object({
    firstName: Yup.string().max(15, "Must be 15 characters or less"),
    // .required("Required"),
    lastName: Yup.string().max(20, "Must be 20 characters or less"),
    // .required("Required"),
    userName: Yup.string().min(4, "Must be 4 characters or more"),
    // .required("Required"),
    dob: Yup.date(),
    location: Yup.string().min(25, "Must be 25 characters or more"),
  });

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
      <input
        className="mr-10"
        type="file"
        name="profile-photo"
        id="profile-photo"
      />

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          userName: "",
          dob: {
            day: "",
            month: "",
            year: "",
          },
          location: "",
        }}
        validationSchema={schemaObject}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5 p-6">
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Tate"
          />
          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="McRae"
          />
          <MyTextInput
            label="Username"
            name="userName"
            type="text"
            placeholder="tateM.R@88"
          />
          <MyTextInput
            label="Date of Birth"
            name="dob"
            type="date"
            placeholder="MM-DD-YYYY"
          />
          <MyTextInput
            label="Location"
            name="location"
            type="text"
            placeholder="123 King Avenue, Km 27 Queen Street"
          />

          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating Profile..." : "Update Profile"}
          </button>
        </Form>
      </Formik>
    </>
  );
};
export default Settings;
