import React, { useState } from "react";
import "../../src/AddNew.css"; // Ensure this path is correct
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEventContext } from "./EventContext";
import QRCode from "react-qr-code";

const FormBuilder = () => {
  const { selectedEvents, setSelectedEvents } = useEventContext(); // Use context
  const location = useLocation();
  const currentRoute = location.pathname.replaceAll('/', '');
  const embedFormData = {
    CustomizedForm:
      "[{\"FieldName\":\"Name\",\"ElementType\":\"TextBox\"},{\"FieldName\":\"Phone No\",\"ElementType\":\"PhoneNumber\"},{\"FieldName\":\"Button\",\"ElementType\":\"Button\"}]",
    EventId
      :
      "1",
    Name
      :
      "New Form"
  }
  const editFormData = currentRoute !== 'EventForm' ? selectedEvents?.eventForms?.find((x: any) => x.EventId === location.state?.eventId) : embedFormData;
  const [formFields, setFormFields] = useState<any>(editFormData?.CustomizedForm ? JSON.parse(editFormData?.CustomizedForm) : []); // Define the type as string array
  const [formName, setFormName] = useState<string>(editFormData?.Name || 'New Form');
  const navigate = useNavigate();
  const elementTypes = [{ FieldName: 'Single Line Text', ElementType: 'SingleLineText' }, { FieldName: 'Name', ElementType: 'TextBox' },
  { FieldName: 'Email', ElementType: 'Email' }, { FieldName: 'Phone No', ElementType: 'PhoneNumber' }, { FieldName: 'Dropdown', ElementType: 'Dropdown' },
  { FieldName: 'Button', ElementType: 'Button' }
  ]

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

  // Handler to add new options
  const addOption = () => {
    if (newOption.trim() !== "") {
      setOptions([...options, newOption]);
      setNewOption(''); // Reset input field after adding
    }
  };

  const renderField = (field: any) => {
    switch (field.ElementType) {
      case 'SingleLineText':
        return <input type="text" placeholder={field.FieldName} className="form-input form-control" />;
      case 'TextBox':
        return <input type="text" placeholder={field.FieldName} className="form-input form-control" />;
      case 'Email':
        return <input type="email" placeholder={field.FieldName} className="form-input form-control" />;
      case 'PhoneNumber':
        return <input type="tel" placeholder={field.FieldName} className="form-input form-control" />;
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

  const formSubmit = () => {
    setFormSubmit(true);
  }

  const formSave = () => {
    // here call save form api
    const formObj = { Name: formName, EventId: '1', CustomizedForm: JSON.stringify(formFields) };
    setSelectedEvents(() => {
      const formsList = selectedEvents?.eventForms || [];
      formsList.push(formObj);
      return { checkedEvents: selectedEvents.checkedEvents, eventForms: formsList };
    });
    navigate('/form-overview');
  };

  const getEmbedLink = () => {
    const urlToCopy = 'http://localhost:3000/EventForm';
    navigator.clipboard.writeText(urlToCopy)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });

  };
  const [isEditing, setIsEditing] = useState(false);
  const generateQrCode = Date.now().toString();

  const editFormName = () => {
    setIsEditing(true);
  }

  return (
    <div className="landing-container">
      {/* <Sidebar /> */}
      {currentRoute !== 'EventForm' ? (<Sidebar />) : null}
      <div className="content-container">
        <div className="app_mainbody">
          <div className="form-editor">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="page-title-heading">Now Editing Blank Form</h2>
              {currentRoute !== 'EventForm' ?

                <div className="d-flex">
                  <button className="btn">
                    Preview
                  </button>
                  <button className="btn ms-2" onClick={getEmbedLink}>
                    Embed
                  </button>
                  <button className="btn ms-2" onClick={formSave}>
                    Save
                  </button>
                </div> : null}
            </div>

            <div className="row mt-3">
              {currentRoute !== 'EventForm' ?
                <div className="col-md-2">
                  {/* <div className="add">Add Fields</div> */}
                  <div className="drag_fields">
                    {elementTypes.map((element) => (
                      <button
                        className="drag_item"
                        draggable
                        onDragStart={(e) => handleDragStart(e, element)}>
                        {element.FieldName}
                      </button>))}
                  </div>
                </div> : null}
              <div className="col-md-10">
                <div
                  className="drag_board"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}>
                  <div className="">
                    {!isEditing && (
                      <div>
                        <div className="dgbg_title">{formName}
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
                      </div>)}
                    <div className="dropped-fields  mt-2">
                      {formFields.map((field: any) => (
                        <div className="field  mb-2">
                          {renderField(field)}
                        </div>
                      ))}
                    </div>
                    {isFormSubmitted && <div>
                      <QRCode value={generateQrCode} size={256} fgColor="#000000" bgColor="#ffffff" level="Q" />
                    </div>}
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
