'use client';
import { useField } from 'formik';

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error text-red-600">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyTextInput;
