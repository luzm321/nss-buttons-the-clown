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
                applicationState.requests = reservationRequests
            }
        );
};

//exporting copy of reservations state:

export const getReservations = () => [...applicationState.reservations];

//Fetching POST request API:

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



