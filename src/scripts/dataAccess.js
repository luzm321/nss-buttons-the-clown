import { render } from "./main.js";
const mainContainer = document.querySelector("#container");

const applicationState = {
    reservations: [],
    clowns: [],
    completions: []
};

// FETCH CALL REQUESTS:

const API = "http://localhost:8088";

//Fetching Get request API call to store external data from the api database in applicationState object:

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

export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
        .then(response => response.json())
        .then(
            (serviceClowns) => {
                // Store the external state in application state
                applicationState.clowns = serviceClowns
            }
        );
};

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (serviceCompletions) => {
                // Store the external state in application state
                applicationState.completions = serviceCompletions
            }
        );
};

//exporting copy of specified object properties of application state:

export const getReservations = () => {
    return applicationState.reservations.sort((a,b) => {
        // a is the second thing, b is the first thing in the array, if the second thing is the same as the first thing return 0, if they aren't
        // the same then is the first thing true, if it is then it returns -1, if it isn't it returns 1.
        // this sorting allows for all the isCompleted requests to be last and the false ones first.
        return (a.isCompleted === b.isCompleted) ? 0 : b.isCompleted ? -1 : 1;
    });
};

// export const getReservations = () => {
//     return applicationState.reservations.map(reservation => ({...reservation}));
// };

export const getClowns = () => {
    return applicationState.clowns.map(clown => ({...clown}));
};

export const getCompletions = () => {
    return applicationState.completions.map(completion => ({...completion}));
};

//Fetching HTTP POST request API; the POST fetch call will dispatch the stateChanged custom event after the POST operation
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

export const saveCompletion = (completion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    };


    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            render();
        });
};

// Fetching HTTP DELETE Request: when using DELETE method on an HTTP request to the API, you must identify a single resource
//(object via the id/primary key) as an argument to avoid deleting an entire collection/array:

export const deleteReservation = (id) => {
    return fetch(`${API}/reservations/${id}`, { method: "DELETE" })
        .then(
            () => {
                // mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
                render();
            }
        );
};



