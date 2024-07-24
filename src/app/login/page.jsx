'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import MyCheckbox from '@/components/MyCheckbox';
import MyTextInput from '@/components/MyTextInput';
import MyPasswordInput from '@/components/MyPasswordInput';
import Link from 'next/link';

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    email: '',
    password: '',
    rememberMe: false,
  };

  const schemaObject = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
      )
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    rememberMe: Yup.boolean()
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
    <section className="grid lg:place-items-center items-center w-[100vw] h-screen">
      <Formik
        initialValues={initialValues}
        validationSchema={schemaObject}
        onSubmit={handleSubmit}>
        <Form className="lg:w-[60%] p-6 lg:mx-auto gap-5 flex flex-col">
          <h1 className="text-center text-2xl mb-6">
            Login to get access to all our amazing products
          </h1>

          <button className="border-2 rounded-lg px-6 py-3 w-full">
            Login with Google
          </button>

          <MyTextInput
            label="Email Address"
            name="email"
            id="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MyPasswordInput
            label="Password"
            name="password"
            id="password"
            placeholder="*********"
          />

          <div className="flex items-center justify-between">
            <MyCheckbox name="rememberMe">Remember me</MyCheckbox>

            <Link
              className="ms-2 text-sky-700 font-semibold hover:underline hover:cursor-pointer"
              href="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <p className="text-center">
            Don&apos;t have an account?{' '}
            <Link
              className="ms-2 text-sky-400 hover:underline hover:cursor-pointer"
              href="/signup">
              SignUp
            </Link>
          </p>
        </Form>
      </Formik>
    </section>
  );
};

export default Login;
