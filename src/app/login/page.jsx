"use client";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from "../config/firebase";
import { useRouter } from 'next/navigation';
import MyCheckbox from '@/components/MyCheckbox';
import MyTextInput from '@/components/MyTextInput';
import MyPasswordInput from '@/components/MyPasswordInput';
import Link from 'next/link';


const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  const provider = new GoogleAuthProvider();
  
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const schemaObject = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      )
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
      rememberMe: Yup.boolean()
      .required('Required')
      .oneOf([true], 'You must accept the terms and conditions.'),
    });
    
    
    const SignInWithPopUp = async() =>{
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          router.push('/')
        }).catch((error) => {
          const errorMessage = error.message;
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
    
    
    const handleSubmit = async(values, actions) => {
      setIsSubmitting((prev) => !prev);
      const res = await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push('/')
      const auth = getAuth();
      
    // //! Delete Timeout fn then handle POST Operation Here
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
    //   actions.setSubmitting(false);
    //   //! Reset submit status after POST operation is completed
    //   setIsSubmitting((prev) => !prev);
    // }, 400);
  };

  return (
    <section className="grid h-screen w-[100vw] items-center lg:place-items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={schemaObject}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5 p-6 lg:mx-auto lg:w-[60%]">
          <h1 className="mb-6 text-center text-2xl">
            Login to get access to all our amazing products
          </h1>

          <button onClick={SignInWithPopUp} className="border-2 rounded-lg px-6 py-3 w-full">
            Login with Google
            <span className="m-0 ms-4 text-3xl leading-none">
              <ion-icon src="/svg/google.svg"></ion-icon>
            </span>
          </button>

          <MyTextInput
            label="Email Address"
            name="email"
            id="email"
            type="email"
            placeholder="tatemcrae88@gmail.com"
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
              className="ms-2 font-medium text-sky-600 hover:cursor-pointer hover:underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              className="ms-2 text-sky-400 hover:cursor-pointer hover:underline"
              href="/signup"
            >
              SignUp
            </Link>
          </p>
        </Form>
      </Formik>
    </section>
  );
};

export default Login;
