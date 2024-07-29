"use client";

import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form } from "formik";
import MyTextInput from "@/components/MyTextInput";

const DeliveryDetails = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedState, setSelectedState] = useState("");

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
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
        }}
        validationSchema={Yup.object({
          addressLine1: Yup.string()
            .min(10, "Must be 10 characters or more")
            .required("Required"),
          addressLine2: Yup.string()
            .min(10, "Must be 10 characters or more")
            .optional(),
          city: Yup.string()
            .min(4, "Must be 4 characters or more")
            .required("Required"),
          state: Yup.string()
            .min(4, "Must be 4 characters or more")
            .required("Required"),
        })}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <MyTextInput
              label="Address Line 1"
              name="addressLine1"
              type="text"
            />
            <MyTextInput
              label="Address Line 2 (Optional)"
              name="addressLine2"
              type="text"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <MyTextInput
              label="City"
              name="city"
              type="text"
              placeholder="Warri"
            />
            <MyTextInput
              label="State"
              name="state"
              type="text"
              placeholder="Delta"
            />
          </div>

          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Updating Delivery Details..."
              : "Update Delivery Details"}
          </button>
        </Form>
      </Formik>
    </>
  );
};
export default DeliveryDetails;
