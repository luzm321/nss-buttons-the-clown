import { ButtonsTheClown } from "./ButtonsTheClown.js";
import { fetchReservations } from "./dataAccess.js";
import { deleteReservation } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

const render = () => {
    fetchReservations().then(
        () => {
            mainContainer.innerHTML = ButtonsTheClown();
        }
    );
};

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("reservation--")) {
        const [,reservationId] = click.target.id.split("--");
        deleteReservation(parseInt(reservationId));
    };
});

render();

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
);