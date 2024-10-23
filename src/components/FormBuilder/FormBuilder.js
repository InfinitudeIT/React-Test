
import React, { useState } from 'react';
import './FormBuilder.css';
import FormField from '../FormField/FormField';
import Toolbox from '../Toolbox/Toolbox';
import SavedForm from '../SavedForm/SavedForm';
import Sidebar from '../Sidebar';

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [formName, setFormName] = useState('New Form');
  const [isSaved, setIsSaved] = useState(false);
  const [embedLink, setEmbedLink] = useState('');

  const handleDragStart = (e, fieldType) => {
    e.dataTransfer.setData('type', fieldType);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const fieldType = e.dataTransfer.getData('type');
    const newField = {
      id: new Date().getTime(),
      type: fieldType,
      label: fieldType.charAt(0).toUpperCase() + fieldType.slice(1),
      options: fieldType === 'dropdown' ? [] : null,
    };
    setFormFields((prevFields) => [...prevFields, newField]);
  };

  const handleFieldUpdate = (updatedField) => {
    setFormFields((prevFields) =>
      prevFields.map((field) =>
        field.id === updatedField.id ? updatedField : field
      )
    );
  };

  const handleSaveForm = () => {
    setIsSaved(true);
    const link = `http://localhost:3000/form/${btoa(JSON.stringify({ formName, formFields }))}`;
    setEmbedLink(link);
  };

  const handleOpenEmbedLink = () => {
    const urlToCopy = 'http://localhost:3000/EventForm';
    navigator.clipboard.writeText(urlToCopy)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });

    if (embedLink) {
      window.open(embedLink, '_blank');
    }
  };

  const handleBackStep = () => {
    setIsSaved(false);
  };

  return (
    <div className="landing-container">
      <Sidebar />
      <div className="content-container">
        <h2>Form Design</h2>
        <div className="form-builder">
          {isSaved ? (
            <>
            <button onClick={handleBackStep}>Back</button><h2>{formName}</h2>
              <SavedForm formName={formName} formFields={formFields} />
              <button onClick={handleOpenEmbedLink}>Open Embedded Link</button>
              {/* <button onClick={handleBackStep}>Back</button> */}
            </>
          ) : (
            <>
              
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Enter Form Name"
              />
              <div className="form-layout"> {/* Flexbox layout for toolbox and drop area */}
                <Toolbox onDragStart={handleDragStart} />
                <div
                  className="drop-area"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  {formFields.length === 0 ? (
                    <p>Drag and drop fields here to start building your form</p>
                  ) : (
                    formFields.map((field) => (
                      <FormField
                        key={field.id}
                        field={field}
                        onUpdate={handleFieldUpdate}
                      />
                    ))
                  )}
                </div>
              </div>
              <button onClick={handleSaveForm}>Save Form</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;

