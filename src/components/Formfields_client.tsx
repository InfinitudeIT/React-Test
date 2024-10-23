import React, { useState } from "react";
import "../../src/Formfields_client.css";
import Sidebar from "./Sidebar";
import QRCode from "react-qr-code";


function FormfieldsClient() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);

  // Handle image selection
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Create a URL for the preview
      const reader: any = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Optionally, handle image upload to server
  const handleImageUpload = () => {
    if (!selectedImage) return;

    // Implement the upload logic here
    // e.g., upload to a server using FormData and fetch/axios
    const formData = new FormData();
    formData.append("image", selectedImage);

    // fetch('/upload', { method: 'POST', body: formData })
  };

  const selectedFormFields: any = [];

  const generateQrCode = Date.now().toString();
  const outputElement = document.getElementById('output');
  console.log(outputElement);  // This will print null if the element is not found

  if (outputElement) {
    // Select all the input fields
    const inputs = document.querySelectorAll('input');
    // Add a click event listener to each input field
    inputs.forEach(input => {
      input.addEventListener('click', (event: any) => {
        const selectedValue = event.target.value;
        selectedFormFields.push(selectedValue);
        outputElement.innerText = `${selectedFormFields}`;
        console.log(selectedValue); // Print to console as well
      });
    });
  } else {
    console.error('Element with id "output" not found!');
  }


  return (
    <div className="landing-container">
      <Sidebar />
      <div className="content-container">
        <div className="app_mainbody">
          <div className="attdtls_page">
            <div className="d-flex align-items-center justify-content-between">
            <h2 className="page-title-heading">Attendee Details</h2>
              <div className="form-buttons">
                <button className="btn">SAVE</button>
                <button className="btn">PRINT</button>
              </div>
            </div>            
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input type="text" value="Ahmad Butt" className="form-control" readOnly />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>Phone No.</label>
                  <input type="text" value="9034664487" className="form-control" readOnly />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input type="email" value="ahmedbutt7420@gmail.com" className="form-control" readOnly />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>Designation</label>
                  <input type="text" value="Any Desig" className="form-control" readOnly />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>Company Name</label>
                  <input type="text" value="Company X" className="form-control" readOnly />

                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label>Upload File</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />

                  {previewUrl && (
                    <div>
                      <h3>Image Preview:</h3>
                      <img src={previewUrl} alt="Selected" style={{ width: "200px" }} />
                    </div>
                  )}
                  <div id="output"></div>
                  {/* <button onClick={handleImageUpload}>Upload Image</button> */}
                </div>
              </div>
              <div className="col-md-12">
                <div className="mt-2 mb-2">
                  <div className="qr-code text-center">
                    {/* <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SampleData"
          alt="QR Code"
        /> */}
                    <QRCode value={generateQrCode} size={256} fgColor="#000000" bgColor="#ffffff" level="Q" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

// Define props for FieldEditor
// interface FieldEditorProps {
//   component: Component;
//   updateField: (id: string, update: Partial<Component>) => void;
// }

// // Define props for Field
// interface FieldProps {
//   type: string;
// }

// // Define props for FormDisplay
// interface FormDisplayProps {
//   components: Component[];
// }

// const FormfieldsClient: React.FC = () => {
//   const [components, setComponents] = useState<Component[]>([]);
//   const [savedForm, setSavedForm] = useState<Component[] | null>(null);

//   const handleDrop = (item: { type: string }) => {
//     const newComponent: Component = {
//       id: uuidv4(),
//       type: item.type,
//       label: fieldTypes[item.type],
//       options: item.type === 'select' ? ['Option 1'] : [],
//     };
//     setComponents([...components, newComponent]);
//   };

//   const updateField = (id: string, update: Partial<Component>) => {
//     const updatedComponents = components.map(comp => (comp.id === id ? { ...comp, ...update } : comp));
//     setComponents(updatedComponents);
//   };

//   const saveForm = () => {
//     setSavedForm(components);
//   };

//   const [, drop] = useDrop({
//     accept: 'field',
//     drop: (item: { type: string }, monitor: DropTargetMonitor) => handleDrop(item),
//   });

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="builder">
//         <div className="toolbox">
//           <h4>Add Fields</h4>
//           {Object.keys(fieldTypes).map((type, index) => (
//             <Field type={type} key={index} />
//           ))}
//         </div>
//         <div className="form-area">
//           <div className="drop-area" ref={drop}>
//             {components.map(comp => (
//               <FieldEditor key={comp.id} component={comp} updateField={updateField} />
//             ))}
//             <button className="save-button" onClick={saveForm}>
//               Save Form
//             </button>
//           </div>
//           {savedForm && <FormDisplay components={savedForm} />}
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// const Field: React.FC<FieldProps> = ({ type }) => {
//   const [, drag] = useDrag(() => ({
//     type: 'field',
//     item: { type },
//   }), [type]);

//   return <div ref={drag} className="field">{fieldTypes[type]}</div>;
// };

// const FieldEditor: React.FC<FieldEditorProps> = ({ component, updateField }) => {
//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     if (name === 'options') {
//       updateField(component.id, { options: value.split(',') });
//     } else {
//       updateField(component.id, { [name]: value });
//     }
//   };

//   return (
//     <div className="field-editor">
//       <input type="text" name="label" value={component.label} onChange={handleChange} />
//       {component.type === 'select' && (
//         <input
//           type="text"
//           name="options"
//           value={component.options?.join(',') || ''}
//           onChange={handleChange}
//           placeholder="Enter options separated by commas"
//         />
//       )}
//     </div>
//   );
// };

// const FormDisplay: React.FC<FormDisplayProps> = ({ components }) => {
//   return (
//     <div className="form-display">
//       {components.map((comp, index) => (
//         <div key={index} className="form-field">
//           <label>{comp.label}</label>
//           {comp.type === 'text' && <input type="text" />}
//           {comp.type === 'checkbox' && <input type="checkbox" />}
//           {comp.type === 'button' && <button>{comp.label}</button>}
//           {comp.type === 'textarea' && <textarea />}
//           {comp.type === 'select' && (
//             <select>
//               {comp.options?.map((option, idx) => (
//                 <option key={idx} value={option}>{option}</option>
//               ))}
//             </select>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

export default FormfieldsClient;







