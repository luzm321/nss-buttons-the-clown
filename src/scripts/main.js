import { ButtonsTheClown } from "./ButtonsTheClown.js";
import { fetchReservations } from "./dataAccess.js";


const render = () => {
    const mainContainer = document.querySelector("#container");
    fetchReservations().then(
        () => {
            mainContainer.innerHTML = ButtonsTheClown();
        }
    );
};

render();

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
);