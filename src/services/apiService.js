import axios from "axios";

const apiBaseUrl = 'http://localhost:8000'; // Load from .env

// Generic GET request
export const getRequest = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${apiBaseUrl}${endpoint}`, {
            params,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "accept": "text/html"
            },
        });
        return response.data;
    } catch (error) {
        console.error(`GET ${endpoint} failed:`, error);
        throw error;
    }
};
// Generic POST request
export const registerUser = async (formData) => {
  const response = await fetch(`${apiBaseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
    credentials: 'include', // To send cookies if needed
  });
  
  if (!response.ok) {
    throw new Error('Signup failed');
  }
  return await response.json();
};


export const loginUser = async (formData) => {
  const formParams = new URLSearchParams();
  formParams.append("email", formData.email);
  formParams.append("password", formData.password);
 
  try {
    const response = await fetch(`${apiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/x-www-form-urlencoded',
      },
      body: formParams,
    });
   
    if (!response.ok) {
      throw new Error("Login Failed");
    }
   
    const data = await response.json();
   
    // Store the JWT token in localStorage
    localStorage.setItem("token", data.access_token);
   
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;  // Returns true if token exists
};

export const saveEvent = async (formData) => {
  const formParams = new URLSearchParams();
  formParams.append("event_name", formData.event_name);
  formParams.append("venue_address", formData.venue_address);
  formParams.append("event_date", formData.event_date);
  formParams.append("audience", formData.audience ? 'true' : 'false');
  formParams.append("delegates", formData.delegates ? 'true' : 'false');
  formParams.append("speaker", formData.speaker ? 'true' : 'false');
  formParams.append("nri", formData.nri ? 'true' : 'false');
  formParams.append("lunch", formData.lunch ? 'true': 'false');
  formParams.append("kit", formData.kit ? 'true': 'false');


  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  try {
    const response = await axios.post(`${apiBaseUrl}/create_event`, formParams, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`, // Include the token in the request
      },
      withCredentials: true, // Include if you need to send credentials (e.g., cookies)
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const updateEvent = async (eventId, formData) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  const formParams = new URLSearchParams();
  formParams.append("event_name", formData.event_name);
  formParams.append("venue_address", formData.venue_address);
  formParams.append("event_date", formData.event_date);

  // Append individual boolean values
  formParams.append("audience", formData.audience ? 'true' : 'false');
  formParams.append("delegates", formData.delegates ? 'true' : 'false');
  formParams.append("speaker", formData.speaker ? 'true' : 'false');
  formParams.append("nri", formData.nri ? 'true' : 'false');
  formParams.append("lunch", formData.lunch ? 'true': 'false');
  formParams.append("kit", formData.kit ? 'true': 'false');


  try {
    const response = await axios.put(`${apiBaseUrl}/edit_event/${eventId}`, formParams, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`, // Include the token in the request
      },
      withCredentials: true, // Include if you need to send cookies
    });

    if (!response.ok) {
      throw new Error("Event update failed");
    }

    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};


export const getEvents = async () => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  const userId = localStorage.getItem("loggedInUserId");

  try {
    const response = await axios.get(`${apiBaseUrl}/user_events/${userId}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`, // Include the token in the request
      },
      withCredentials: true, // Include if you need to send credentials (e.g., cookies)
    });
    return response.data; // Now includes the event id in the response
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getEventById = async (eventId) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  
  try {
    const response = await axios.get(`${apiBaseUrl}/event/${eventId}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`, // Include the token in the request
      },
      withCredentials: true, // Include if you need to send credentials (e.g., cookies)
    });
    return response.data; // Now includes the event id in the response
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};


export const deleteEvent = async (eventid) => {
  const formParams = new URLSearchParams();
  formParams.append("event_id", eventid);
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  try {
    const response = await axios.post(`${apiBaseUrl}/delete_event`, formParams, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${token}`, // Include the token in the request
      },
      withCredentials: true, // Include if you need to send credentials (e.g., cookies)
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// Generic PUT request
export const putRequest = async (endpoint, data = {}) => {
    try {
        const response = await axios.put(`${apiBaseUrl}${endpoint}`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "accept": "text/html"
            },
        });
        return response.data;
    } catch (error) {
        console.error(`PUT ${endpoint} failed:`, error);
        throw error;
    }
};

// Generic DELETE request
export const deleteRequest = async (endpoint) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}${endpoint}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "accept": "text/html"
            },
        });
        return response.data;
    } catch (error) {
        console.error(`DELETE ${endpoint} failed:`, error);
        throw error;
    }
};
