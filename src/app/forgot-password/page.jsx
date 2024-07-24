'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import MyTextInput from '@/components/MyTextInput';
import Link from 'next/link';

const ForgotPassword = () => {
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
      <section className="grid lg:place-items-center items-center w-[100vw] h-screen">
        <Link
          className="absolute top-[10%] left-[10%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          href="/login">
            Back
        </Link>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
          })}
          onSubmit={handleSubmit}>
          <Form className="lg:w-[60%] p-6 lg:mx-auto gap-5 flex flex-col">
            <h1 className='text-2xl text-center mb-6'>We&apos;ll send you a link to reset your password</h1>
            <MyTextInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="jane@formik.com"
            />

            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              type="submit"
              disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </Form>
        </Formik>
      </section>
    </>
  );
};

export default ForgotPassword;
