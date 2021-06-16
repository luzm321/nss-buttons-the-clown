import { ButtonsTheClown } from "./ButtonsTheClown.js";
import { fetchReservations } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

export const render = () => {
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
        render();
    }
);