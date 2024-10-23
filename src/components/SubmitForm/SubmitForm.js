import React from 'react';
import './SubmitForm.css';

const SubmitForm = ({ formFields }) => {
  return (
    <div className="submit-form">
      <h2>Generated Form</h2>
      <form>
        {formFields.map((field, index) => (
          <div key={index}>
            <label>{field.label}</label>
            {field.type === 'text' && <input type="text" placeholder={field.label} />}
            {field.type === 'email' && <input type="email" placeholder={field.label} />}
            {field.type === 'phone' && <input type="tel" placeholder={field.label} />}
            {field.type === 'dropdown' && (
              <select>
                {field.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {field.type === 'checkbox' && <input type="checkbox" />}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitForm;
