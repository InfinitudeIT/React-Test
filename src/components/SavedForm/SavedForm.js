import React from 'react';
import './SavedForm.css';

const SavedForm = ({ formName, formFields }) => {
  return (
    <div className="saved-form">
      <h2>{formName}</h2>
      <form>
        {formFields.map((field) => {
          switch (field.type) {
            case 'text':
              return (
                <div key={field.id}>
                  <label>{field.label}</label>
                  <input type="text" placeholder={field.label} />
                </div>
              );
            case 'email':
              return (
                <div key={field.id}>
                  <label>{field.label}</label>
                  <input type="email" placeholder={field.label} />
                </div>
              );
            case 'phone':
              return (
                <div key={field.id}>
                  <label>{field.label}</label>
                  <input type="tel" placeholder={field.label} />
                </div>
              );
            case 'dropdown':
              return (
                <div key={field.id}>
                  <label>{field.label}</label>
                  <select>
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
                <div key={field.id}>
                  <label>
                    <input type="checkbox" />
                    {field.label}
                  </label>
                </div>
              );
            case 'submit':
              return (
                <div key={field.id}>
                  <button type="submit">{field.label}</button>
                </div>
              );
            default:
              return null;
          }
        })}
      </form>
    </div>
  );
};

export default SavedForm;
