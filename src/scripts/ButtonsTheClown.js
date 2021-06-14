import { Reservations } from "./Reservations.js";
import { ReservationForm } from "./ReservationForm.js";

export const ButtonsTheClown = () => {
    return `
    <h1>Buttons' and Lollipop's Clown Rental</h1>
    <section class="services reservationForm">
        ${ReservationForm()}
    </section>
    <section class="services reservationRequests">
        <h2>Reservation Requests</h2>
        ${Reservations()}
    </section>
    `
};