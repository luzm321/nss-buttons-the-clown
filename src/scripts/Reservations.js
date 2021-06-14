import { getReservations } from "./dataAccess.js";



export const Reservations = () => {
    const reservations = getReservations();

    let reservationHTML = `<ul class="reservations">
        ${reservations.map(reservation => `<li>
            ${reservation.parentName} for ${reservation.childName} at ${reservation.address} for a birthday party on ${reservation.partyDate}.
            <button class="reservation__delete" id="reservation--${reservation.id}"> Deny </button>
            </li>`).join("")
        } </ul>`;

    return reservationHTML;
};