'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import MyCheckbox from '@/components/MyCheckbox';
import MyTextInput from '@/components/MyTextInput';
import MyPasswordInput from '@/components/MyPasswordInput';
import Link from 'next/link';

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  };

  const schemaObject = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
      )
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    acceptedTerms: Yup.boolean()
      .required('Required')
      .oneOf([true], 'You must accept the terms and conditions.'),
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
    <section className="grid lg:place-items-center w-[100vw] min-h-screen py-10">
      <Formik
        initialValues={initialValues}
        validationSchema={schemaObject}
        onSubmit={handleSubmit}>
        <Form className="lg:w-[60%] p-6 lg:mx-auto gap-5 flex flex-col">
          <button className="border-2 rounded-lg px-6 py-3 w-full">
            Sign Up with Google
          </button>
          <div className="grid gap-6 md:grid-cols-2">
            <MyTextInput
              label="First Name"
              name="firstName"
              id="firstName"
              type="text"
              placeholder="Jane"
              focus
            />

            <MyTextInput
              label="Last Name"
              name="lastName"
              id="lastName"
              type="text"
              placeholder="Doe"
            />
          </div>

          <MyTextInput
            label="Email Address"
            name="email"
            id="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MyPasswordInput
            label="Enter Password"
            name="password"
            id="password"
            placeholder="*********"
          />

          <MyPasswordInput
            label="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="*********"
          />

          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <p className="text-center">
            Already have an account?{' '}
            <Link
              className="ms-2 text-sky-400 hover:underline cursor-pointer"
              href="/login">
              Login
            </Link>
          </p>
        </Form>
      </Formik>
    </section>
  );
};

export default Signup;
