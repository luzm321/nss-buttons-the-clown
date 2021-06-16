import { ButtonsTheClown } from "./ButtonsTheClown.js";
import { fetchReservations, fetchClowns, fetchCompletions } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

//render function invokes the fetchReservations function which returns the external data from the api database stored in applicationState object,
//then the data structures can be converted into HTML representations:
//fetchReservations method returns a promise, which you resolve with .then() and chain the .then() which takes the fxn fetchClowns which returns a
//promise that you resolve with another .then which takes the fxn fetchCompletions returns another promise that you resolve with yet another .then
//which takes a function that enables the returned html representation value of calling the ButtonsTheClown() fxn to be displayed to the DOM after the
// render() fxn is invoked on line 2:

export const render = () => {
    fetchReservations()
    .then(fetchClowns)
    .then(fetchCompletions)
    .then(
        () => {
            mainContainer.innerHTML = ButtonsTheClown()
        }
    );
};

render();

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render();
    }
);