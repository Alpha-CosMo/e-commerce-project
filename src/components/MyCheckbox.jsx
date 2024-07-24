'use client'
import { useField } from 'formik';

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently from other input types: select and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <input
        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
        id='checkbox'
        type="checkbox"
        {...field}
        {...props}
      />
      <label className="ms-2 text-sm font-medium text-gray-900" for="checkbox">
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyCheckbox;
