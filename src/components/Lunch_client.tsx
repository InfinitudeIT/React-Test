import React, { useState } from 'react';
import '../../src/Lunch_client.css'
import Sidebar from './Sidebar';

function LunchSelection() {
  const [participants, setParticipants] = useState([
    { id: 1, name: 'Madhan', event: '', date: '', lunch: '' },
    { id: 2, name: 'Joseph', event: '', date: '', lunch: '' }
  ]);

  const handleCheckboxChange = (id?: any) => {
    setParticipants(
      participants.map(participant =>
        participant.id === id ? { ...participant, lunch: participant.lunch === 'Selected' ? '' : 'Selected' } : participant
      )
    );
  };

  return (
    <div className="landing-container">
      <Sidebar />
      <div className="content-container">
        <div className="app_mainbody">
          <div>
            <div className="d-flex align-items-center justify-content-between bdr_btm">
              <h2 className="page-title-heading">Lunch</h2>
            </div>
            <div className="table_format">
              <table className='table table-striped'>
                <thead className="table-dark">
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Event name</th>
                    <th>Date</th>
                    <th>Lunch</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map(participant => (
                    <tr key={participant.id}>
                      <td><input type="checkbox" /></td>
                      <td>{participant.name}</td>
                      <td>{participant.event}</td>
                      <td>{participant.date}</td>
                      <td>{participant.lunch}</td>
                      <td>{participant.lunch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default LunchSelection;
