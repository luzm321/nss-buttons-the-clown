const mainContainer = document.querySelector("#container");

const applicationState = {
    reservations: []
};

const API = "http://localhost:8088";

//Fetching GET request API call:

export const fetchReservations = () => {
    return fetch(`${API}/reservations`)
        .then(response => response.json())
        .then(
            (reservationRequests) => {
                // Store the external state in application state
                applicationState.reservations = reservationRequests
            }
        );
};

//exporting copy of reservations state:

export const getReservations = () => [...applicationState.reservations];

//Fetching POST request API; the POST fetch call will dispatch the stateChanged custom event after the POST operation
//is completed; every time state changes, you have to generate new HTML representations of the state:

export const sendReservation = (userServiceReservation) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceReservation)
    };


    return fetch(`${API}/reservations`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
        });
};

// Fetching HTTP DELETE Request: when using DELETE method on an HTTP request to the API, you must identify a single resource
//(object via the id/primary key) as an argument to avoid deleting an entire collection/array:

export const deleteReservation = (id) => {
    return fetch(`${API}/reservations/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        );
};



