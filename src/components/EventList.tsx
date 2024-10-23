
import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import '../../src/EventList.css';
import { useNavigate } from 'react-router-dom';
import { useEventContext } from './EventContext'; // Import the context
import { deleteEvent, getEvents } from '../services/apiService';


const EventList: React.FC = () => {
  const { selectedEvents, setSelectedEvents } = useEventContext(); // Use context
  const navigate = useNavigate();
  const [events, setEvents] = React.useState<any[]>([]);
  
  const fetchEvents = async () => {
    const response = await getEvents();
    setEvents(response);
  };
  // Simulating fetching data from an API
  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to handle checkbox selection
  const handleSelectEvent = (event: any) => {
    setSelectedEvents((prevSelected: any) => {
      if (prevSelected?.checkedEvents?.find((x:any) => x.id === event.id)) {
        // If the event is already selected, remove it from the list
        return prevSelected?.checkedEvents?.filter((data: any) => data.id !== event.id);
      } else {
        // If the event is not selected, add it to the list
        return { checkedEvents: [...prevSelected?.checkedEvents || [], event] };
      }
    });
  };

  const handleCreateEvent = () => {
    navigate('/create-event'); // Navigate to the "Create Event" route
  };

  const isEventSelected = (event: any) => {
    return selectedEvents?.checkedEvents?.find((x: any) => x.id == event.id) ? true : false;
  }

  const handleEditEvent = (eventId: any) => {
    navigate('/edit-event', { state: { eventId: eventId } });
  }

  const deleteEvents = async() => {
    const selectedEventIds = selectedEvents.checkedEvents.map((x:any) => x.id).join(',');
    const response = await deleteEvent(selectedEventIds);
    if (response) {
      fetchEvents();
    }
  }

  return (
    <div className="landing-container">
      <Sidebar /> {/* Sidebar now gets selectedEvents from context */}
      <div className="content-container">
        <div className="app_mainbody">
          <div className='position-relative'>
            <button type="button" className="btn next-button" onClick={deleteEvents}>Trash</button>
            <div className="d-flex align-items-center justify-content-between">
              <h2 className='page-title-heading'>Events List</h2>
              <button className="btn crevnt_btn" onClick={handleCreateEvent}>Create Event</button>
            </div>
            {events?.length > 0 ? (
              <div className="table_format mt-3">
                <table className="table event-table table-striped">
                  <thead className='thead-dark'>
                    <tr>
                      <th>Select</th>
                      <th>Event Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event.id}>
                        <td>
                          <input type="checkbox" checked={isEventSelected(event)}
                            onChange={() => handleSelectEvent(event)} />
                        </td>
                        <td>{event.event_name}</td>
                        <td className="crsrpntr" onClick={() => handleEditEvent(event.id)}>✏️</td>
                      </tr>
                    ))}
                  </tbody>
                </table>                
              </div>
            ) : (
              <div className="notfound_img">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/search-not-found-illustration-download-in-svg-png-gif-file-formats--page-error-404-empty-state-pack-user-interface-illustrations-5210416.png" alt="NotFound" />
                <p>No Events Found</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventList;
