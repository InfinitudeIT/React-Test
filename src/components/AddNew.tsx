import React, { useEffect, useState } from "react";
import "../../src/AddNew.css"; // Ensure this path is correct
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEventContext } from "./EventContext";
import QRCode from "react-qr-code";
import { showToast } from "../Shared/Toaster";
import { getEmbedForm, getFormById, getReactbaseUrl, registerForm, saveForm, updateForm } from "../services/apiService";

const FormBuilder = () => {
  const { selectedEvents } = useEventContext(); // Use context
  const location = useLocation();
  const currentRoute = location.pathname.split('/')[1];
  const editFormId = location.pathname.split('/')[2] || '';
  const [formData, setFormData] = useState<any>({});

  const [formFields, setFormFields] = useState<any>([]); // Initialize as empty array
  const [formName, setFormName] = useState<string>('New Form'); // Default name
  const [formDataObject, setFormObject] = useState<any>({});

  const navigate = useNavigate();
  
  // Define your element types
  const elementTypes = [
    { FieldName: 'Single Line Text', ElementType: 'SingleLineText' },
    { FieldName: 'Name', ElementType: 'TextBox' },
    { FieldName: 'Email', ElementType: 'Email' },
    { FieldName: 'Phone No', ElementType: 'PhoneNumber' },
    { FieldName: 'Dropdown', ElementType: 'Dropdown' },
    { FieldName: 'Button', ElementType: 'Button' }
  ];

  // Fetch the form on initial load
  const getForm = async () => {
    if (editFormId) {
      try {
        const form = currentRoute !== 'EventForm' ? await getFormById(editFormId) : await getEmbedForm(editFormId);
        if (form) {
          setFormData(form);
          setFormFields(form.form_data || []); // Update form fields from fetched data
          setFormName(form.form_name || 'New Form'); // Update form name from fetched data
          if (currentRoute === 'EventForm') {
            const result: { [key: string]: any } = {}; // Initialize an empty object
            formFields.forEach((element: any) => {
              // Assuming element has a property that corresponds to the field name
              if (element['field']) {
                result[element['field']] = ''; // Set the value for the specific field
              }
            });
            setFormObject(result);
          }
        }
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    }
  };

  useEffect(() => {
    getForm(); // Call getForm on component mount
  }, [editFormId]); // Dependency on editFormId to refetch if it changes

  // The rest of your component code...

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>, field: any) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(field));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const field = JSON.parse(e.dataTransfer.getData("text/plain"));
    setFormFields((prevFields: any) => [...prevFields, field]); // prevFields is already typed
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const [options, setOptions] = useState<any>([]); // State for storing dynamic options
  const [newOption, setNewOption] = useState<any>(''); // State for input of the new option
  const [submitFormObject, setSubmitForm] = useState<any>({});

  // Handler to add new options
  const addOption = () => {
    if (newOption.trim() !== "") {
      setOptions([...options, newOption]);
      setNewOption(''); // Reset input field after adding
    }
  };

  const setValueToField = (value: any, field: any) => {
     formDataObject[field] = value;
  };

  const renderField = (field: any) => {
    switch (field.ElementType) {
      case 'SingleLineText':
      case 'TextBox':
        return <input type="text" key={field.FieldName} onChange={(e) => setValueToField(e.target.value, field.FieldName)} placeholder={field.FieldName} className="form-input form-control" />;
      case 'Email':
        return <input type="email" key={field.FieldName} onChange={(e) => setValueToField(e.target.value, field.FieldName)} placeholder={field.FieldName} className="form-input form-control" />;
      case 'PhoneNumber':
        return <input type="tel" key={field.FieldName} onChange={(e) => setValueToField(e.target.value, field.FieldName)} placeholder={field.FieldName} className="form-input form-control" />;
      case 'Dropdown':
        return (
          <>
            <select className="form-input">
              <option value="">Select...</option>
              {options.map((option: any, index: any) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Enter new option"
            />
            <button onClick={addOption}>+</button>
          </>
        );
      case 'Button':
        return <button type="submit" onClick={formSubmit} className="btn form-button">Submit</button>;
      default:
        return null;
    }
  };

  const [isFormSubmitted, setFormSubmit] = useState(false);

  const formSubmit = async() => {
    const formObj = { mode: 'Online', submission_data: formDataObject};
    try {
      const response = await registerForm(editFormId, formObj);
      if (response?.success) {
        showToast(response.message, 'success');
        navigate("/form-overview");
      }
    } catch (error) {
      console.error('Error saving event:', error);
    }
    setFormSubmit(true);
  };

  const formSave = async () => {
    const formObj = { name: formName, event_id: selectedEvents.selectedEvent, CustomizedForm: JSON.stringify(formFields) };
    try {
      const response = await saveForm(formObj);
      if (response?.success) {
        showToast(response.message, 'success');
        navigate("/form-overview");
      }
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const formUpdate = async () => {
    const formObj = { name: formName, event_id: selectedEvents.selectedEvent, CustomizedForm: JSON.stringify(formFields) };
    try {
      const response = await updateForm(editFormId, formObj);
      if (response?.success) {
        showToast(response.message, 'success');
        navigate("/form-overview");
      }
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  const getEmbedLink = () => {
    const urlToCopy = getReactbaseUrl() + '/EventForm/' + editFormId;
    navigator.clipboard.writeText(urlToCopy)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const [isEditing, setIsEditing] = useState(false);
  
  const editFormName = () => {
    setIsEditing(true);
  };

  const formBack = () => {
    navigate("/form-overview");
  };

  return (
    <div className={`${currentRoute !== 'EventForm' ? 'landing-container ' : ''}`}>
      {currentRoute !== 'EventForm' ? (<Sidebar />) : null}
      <div className="content-container">
        <div className="app_mainbody">
          <div className="form-editor">
            <div className="d-flex align-items-center justify-content-between">
            {currentRoute !== 'EventForm' && <h2 className="page-title-heading">Now Editing {formName}</h2>}
              {currentRoute !== 'EventForm' ? (
                <div className="d-flex">
                  <button className="btn ms-2" onClick={formBack}>Back</button>
                  <button className="btn">Preview</button>
                  <button className="btn ms-2" onClick={getEmbedLink}>Embed</button>
                  {!editFormId ? (<button className="btn ms-2" onClick={formSave}>Save</button>) : (
                  <button className="btn ms-2" onClick={formUpdate}>Update</button>)}
                </div>
              ) : null}
            </div>

            <div className="row mt-3">
              {currentRoute !== 'EventForm' ? (
                <div className="col-md-2">
                  <div className="drag_fields">
                    {elementTypes.map((element) => (
                      <button
                        key={element.ElementType} // Add a key prop
                        className="drag_item"
                        draggable
                        onDragStart={(e) => handleDragStart(e, element)}>
                        {element.FieldName}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="col-md-10">
                <div className="drag_board" onDrop={handleDrop} onDragOver={handleDragOver}>
                  <div className="">
                    {!isEditing && (
                      <div>
                        <div className="dgbg_title">
                          {formName}
                          {currentRoute !== 'EventForm' && (
                            <span className="crsrpntr ms-2" onClick={editFormName}>✏️</span>
                          )}
                        </div>
                      </div>
                    )}
                    {isEditing && (
                      <div>
                        <input
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          onFocus={() => setIsEditing(true)} className="form-control"
                        />
                      </div>
                    )}
                    <div className="dropped-fields mt-2">
                      {formFields.map((field: any, index: number) => (
                        <div key={index} className="field mb-2">
                          {renderField(field)}
                        </div>
                      ))}
                    </div>
                    {isFormSubmitted && (
                      <div>
                        <QRCode value={Date.now().toString()} size={256} fgColor="#000000" bgColor="#ffffff" level="Q" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
