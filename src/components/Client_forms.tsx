import React, { useEffect } from 'react';
import '../../src/Client_forms.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEventContext } from './EventContext';
import { getFormsByEventId } from '../services/apiService';

const FormsOverview = () => {
  const { selectedEvents } = useEventContext();
  const [formsData, setForms] = React.useState<any[]>([]);
  const navigate = useNavigate();

  const fetchFormsByEventId = async () => {
    const response = await getFormsByEventId(selectedEvents.selectedEvent);
    if (response) {
      setForms(response);
    }
  };

  // Simulating fetching data from an API
  useEffect(() => {
    fetchFormsByEventId();
  }, []);

  const handleCreateEvent = () => {
    navigate('/CreateForm'); // Navigate to the "Create Event" route
  };

  const editForm = (formId: any) => {
    navigate('/EditForm/' + formId);
  };


  return (
    <div className="landing-container">
      <Sidebar />
      <div className="content-container">
        <div className="app_mainbody">
          <div className="">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className='page-title-heading'>Forms Overview</h2>
              <button className="btn" onClick={handleCreateEvent}>Add New</button>
            </div>
            {formsData?.length > 0 ? (
              <div className='mt-3'>
                <div className="trash-icon text-end">🗑️ Trash</div>
                <div className="table_format mt-2">
                  <table className="table table-striped">
                    <thead className='table-dark'>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>HTML Code</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formsData.map((form: any, index: any) => (
                        <tr key={index}>
                          <td><input type="checkbox" /></td>
                          <td>{form.form_name}</td>
                          <td><button className="html-code-button">2</button></td>
                          <td><span className="edit-icon" onClick={() => editForm(form.id)}>✏️</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p>No Forms Found.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default FormsOverview;
