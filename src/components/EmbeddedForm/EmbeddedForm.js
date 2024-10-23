// import React from 'react';
// import { useParams } from 'react-router-dom';
// import './EmbeddedForm.css'; // Import the CSS file for styling

// const EmbeddedForm = () => {
//   const { encodedFormData } = useParams(); // Retrieve the encoded form data from URL params
//   const formData = JSON.parse(atob(encodedFormData)); // Decode and parse the form data

//   return (
//     <div className="embedded-form-container">
//       <h2 className="form-title">{formData.formName}</h2>
//       <form className="form-fields">
//         {formData.formFields.map((field) => {
//           switch (field.type) {
//             case 'text':
//             case 'email':
//             case 'phone':
//               return (
//                 <div key={field.id} className="form-group">
//                   <label>{field.label}</label>
//                   <input type={field.type} placeholder={field.label} className="form-input" />
//                 </div>
//               );
//             case 'dropdown':
//               return (
//                 <div key={field.id} className="form-group">
//                   <label>{field.label}</label>
//                   <select className="form-dropdown">
//                     {field.options.map((option, index) => (
//                       <option key={index} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               );
//             case 'checkbox':
//               return (
//                 <div key={field.id} className="form-group">
//                   <label className="checkbox-label">
//                     <input type="checkbox" className="form-checkbox" />
//                     {field.label}
//                   </label>
//                 </div>
//               );
//             default:
//               return null;
//           }
//         })}
//         <button type="submit" className="submit-btn">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default EmbeddedForm;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SHA256 } from 'crypto-js'; // Import the SHA256 function
import './EmbeddedForm.css';

const EmbeddedForm = () => {
  const { encodedFormData } = useParams();
  const formData = JSON.parse(atob(encodedFormData));

  const [formValues, setFormValues] = useState(
    formData.formFields.reduce((acc, field) => {
      acc[field.id] = field.type === 'checkbox' ? false : '';
      return acc;
    }, {})
  );

  const handleChange = (e, fieldId, fieldType) => {
    const { value, checked } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldId]: fieldType === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a unique hash for the form data
    const formHash = SHA256(JSON.stringify(formValues)).toString();
    const shortUniqueCode = formHash.substring(0, 10); // Truncate to first 10 characters

    // Transform formValues to use labels as keys
    const formattedValues = formData.formFields.reduce((acc, field) => {
      acc[field.label] = formValues[field.id]; // Map label to its corresponding value
      return acc;
    }, {});

    try {
      const response = await fetch('http://localhost:8000/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formId: shortUniqueCode, // Use the short unique code here
          values: formattedValues, // Send the transformed values
        }),
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        alert('Form submitted successfully');
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="embedded-form-container">
      <h2 className="form-title">{formData.formName}</h2>
      <form className="form-fields" onSubmit={handleSubmit}>
        {formData.formFields.map((field) => {
          switch (field.type) {
            case 'text':
            case 'email':
            case 'phone':
              return (
                <div key={field.id} className="form-group">
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.label}
                    className="form-input"
                    value={formValues[field.id] || ''}
                    onChange={(e) => handleChange(e, field.id, field.type)}
                  />
                </div>
              );
            case 'dropdown':
              return (
                <div key={field.id} className="form-group">
                  <label>{field.label}</label>
                  <select
                    className="form-dropdown"
                    value={formValues[field.id] || ''}
                    onChange={(e) => handleChange(e, field.id, 'dropdown')}
                  >
                    <option value="">Select an option</option>
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            case 'checkbox':
              return (
                <div key={field.id} className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={formValues[field.id] || false}
                      onChange={(e) => handleChange(e, field.id, 'checkbox')}
                    />
                    {field.label}
                  </label>
                </div>
              );
            default:
              return null;
          }
        })}
        <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default EmbeddedForm;



