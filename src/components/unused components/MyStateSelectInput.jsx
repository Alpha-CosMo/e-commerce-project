// import React, { useState } from "react";
// import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";

// MySelectInput.js
'use client';
import { useField, useFormikContext } from 'formik';

export const states = [
  { id: "1", name: "Abia" },
  { id: "2", name: "Adamawa" },
  { id: "3", name: "Akwa Ibom" },
  { id: "4", name: "Anambra" },
  { id: "5", name: "Bauchi" },
  { id: "6", name: "Bayelsa" },
  { id: "7", name: "Benue" },
  { id: "8", name: "Borno" },
  { id: "9", name: "Cross River" },
  { id: "10", name: "Delta" },
  { id: "11", name: "Ebonyi" },
  { id: "12", name: "Edo" },
  { id: "13", name: "Ekiti" },
  { id: "14", name: "Enugu" },
  { id: "15", name: "Gombe" },
  { id: "16", name: "Imo" },
  { id: "17", name: "Jigawa" },
  { id: "18", name: "Kaduna" },
  { id: "19", name: "Kano" },
  { id: "20", name: "Kogi" },
  { id: "21", name: "Katsina" },
  { id: "22", name: "Kebbi" },
  { id: "23", name: "Kwara" },
  { id: "24", name: "Lagos" },
  { id: "25", name: "Nasarawa" },
  { id: "26", name: "Niger" },
  { id: "27", name: "Ogun" },
  { id: "28", name: "Ondo" },
  { id: "29", name: "Osun" },
  { id: "30", name: "Oyo" },
  { id: "31", name: "Plateau" },
  { id: "32", name: "Rivers" },
  { id: "33", name: "Sokoto" },
  { id: "34", name: "Taraba" },
  { id: "35", name: "Yobe" },
  { id: "36", name: "Zamfara" },
  { id: "37", name: "Abuja" },
];

export const cities = {
  1: ["Umuahia", "Aba", "Ohafia"],
  2: ["Yola", "Mubi", "Ganye"],
  3: ["Uyo", "Ikot Ekpene", "Eket"],
  4: ["Awka", "Onitsha", "Nnewi"],
  5: ["Bauchi", "Azare", "Jama’are"],
  6: ["Yenagoa", "Brass", "Sagbama"],
  7: ["Makurdi", "Gboko", "Otukpo"],
  8: ["Maiduguri", "Bama", "Gubio"],
  9: ["Calabar", "Ugep", "Ogoja"],
  10: ["Asaba", "Warri", "Sapele"],
  11: ["Abakaliki", "Iboko", "Onueke"],
  12: ["Benin City", "Ekpoma", "Uromi"],
  13: ["Ado-Ekiti", "Ijero", "Ikole"],
  14: ["Enugu", "Nsukka", "Oji River"],
  15: ["Gombe", "Kaltungo", "Billiri"],
  16: ["Owerri", "Orlu", "Okigwe"],
  17: ["Dutse", "Hadejia", "Kazaure"],
  18: ["Kaduna", "Zaria", "Kafanchan"],
  19: ["Kano", "Kano City", "Wudil"],
  20: ["Lokoja", "Kogi", "Okene"],
  21: ["Katsina", "Daura", "Funtua"],
  22: ["Birnin Kebbi", "Jega", "Argungu"],
  23: ["Ilorin", "Offa", "Oke-Ode"],
  24: ["Lagos", "Ikeja", "Victoria Island"],
  25: ["Lafia", "Akwanga", "Keffi"],
  26: ["Minna", "Suleja", "Kontagora"],
  27: ["Abeokuta", "Ijebu Ode", "Ota"],
  28: ["Akure", "Ondo", "Owo"],
  29: ["Osogbo", "Ilesa", "Ife"],
  30: ["Ibadan", "Oyo", "Ogbomosho"],
  31: ["Jos", "Bukuru", "Pankshin"],
  32: ["Port Harcourt", "Obio-Akpor", "Eleme"],
  33: ["Sokoto", "Gwadabawa", "Bodinga"],
  34: ["Jalingo", "Wukari", "Yorro"],
  35: ["Damaturu", "Gashua", "Potiskum"],
  36: ["Gusau", "Zamfara", "Anka"],
  37: ["Abuja", "Garki", "Wuse"],
};

// Validation schema
// const validationSchema = Yup.object({
//   state: Yup.string().required("Required"),
//   city: Yup.string().required("Required"),
// });

// const MySelectInput = () => {
//   const [selectedState, setSelectedState] = useState("");

//   return (
//     <Formik
//       initialValues={{ state: "", city: "" }}
//       validationSchema={validationSchema}
//       onSubmit={(values) => {
//         console.log(values);
//       }}
//     >
//       {({ setFieldValue, values, errors, touched }) => (
//         <Form className="grid gap-6 md:grid-cols-2">
//           <div className="flex flex-col">
//             <label
//               htmlFor="state"
//               className="mb-2 block text-sm font-medium text-gray-900"
//             >
//               State
//             </label>
//             <Field
//               as="select"
//               id="state"
//               name="state"
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
//               onChange={(event) => {
//                 const stateId = event.target.value;
//                 setSelectedState(stateId);
//                 setFieldValue("state", stateId);
//                 setFieldValue("city", ""); // Reset city when state changes
//               }}
//             >
//               <option value="">Select a state</option>
//               {states.map((state) => (
//                 <option key={state.id} value={state.id}>
//                   {state.name}
//                 </option>
//               ))}
//             </Field>
//             {touched.state && errors.state ? (
//               <div className="text-sm text-red-500">{errors.state}</div>
//             ) : null}
//           </div>

//           <div className="flex flex-col">
//             <label
//               htmlFor="city"
//               className="mb-2 block text-sm font-medium text-gray-900"
//             >
//               City
//             </label>
//             <Field
//               as="select"
//               id="city"
//               name="city"
//               className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
//               disabled={!selectedState}
//             >
//               <option value="">Select a city</option>
//               {selectedState &&
//                 cities[selectedState]?.map((city, index) => (
//                   <option key={index} value={city}>
//                     {city}
//                   </option>
//                 ))}
//             </Field>
//             {touched.city && errors.city ? (
//               <div className="text-sm text-red-500">{errors.city}</div>
//             ) : null}
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };


const MyStateSelectInput = ({ label, name, options, ...props }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div>
      <label
        htmlFor={props.id || props.name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...field}
        {...props}
        onChange={(e) => {
          const { value } = e.target;
          setFieldValue(name, value);
          if (name === 'state') {
            // Clear city selection when state changes
            setFieldValue('city', '');
          }
        }}
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <div className="text-red-600 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyStateSelectInput;


// export default MySelectInput;
