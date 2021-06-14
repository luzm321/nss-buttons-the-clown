import { Reservations } from "./Reservations.js";
import { ReservationForm } from "./ReservationForm.js";

export const ButtonsTheClown = () => {
    return `
    <div>
        <h1>Buttons' and Lollipop's Clown Rental</h1>
        <img class="gif" src="../../images/clownGif.gif" alt="clown gif">
    </div>
    <section class="services reservationForm">
        ${ReservationForm()}
    </section>
    <section class="services reservationRequests">
        <h2>Reservation Requests</h2>
        ${Reservations()}
    </section>
    `
};