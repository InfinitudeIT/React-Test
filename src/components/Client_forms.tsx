import React from 'react';
import '../../src/Client_forms.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEventContext } from './EventContext';

const FormsOverview = () => {
  const { selectedEvents } = useEventContext();
  const formsData = selectedEvents?.eventForms || [];
  const navigate = useNavigate();

  const getCreatedForms = async (e?: any) => {
    e.preventDefault(); // Prevent form from refreshing the page
    try {
      // const response = await loginUser({ email, password });
    }
    catch (error) {
    }
  };

  const handleCreateEvent = () => {
    navigate('/CreateForm'); // Navigate to the "Create Event" route
  };

  const editForm = () => {
    navigate('/EditForm', { state: { eventId: '1' } });
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
                          <td>{form.Name}</td>
                          <td><button className="html-code-button">2</button></td>
                          <td><span className="edit-icon" onClick={editForm}>✏️</span></td>
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
