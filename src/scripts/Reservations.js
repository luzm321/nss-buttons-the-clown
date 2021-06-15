import { getReservations } from "./dataAccess.js";



export const Reservations = () => {
    const reservations = getReservations();

    //Sorting through an array of objects by its property value by utilizing the sort() method as shown below which takes a callback function that
    //takes as parameters 2 objects (a,b) contained in the reservations array. Sorting through the partyDate property in the database to return the
    //sorted reservations to be displayed in chronological order. Need to implement parseInt() and split() methods to extract the integer from the
    //string value in database.
    //When 1 is returned(or a is > b), the function communicates to sort() that the object a takes precedence in sorting over the object b (ascending). Returning
    //-1 (a < b) would do the opposite of the chronological order(descending) by switching position of object a and b. The returned boolean value determines
    //the ascending or descending order.
    //The callback function could calculate other properties too, to handle the case where the date is the same, and sort by a secondary property.
    
    const sortedReservations = reservations.sort((a,b) => {
        return parseInt(a.partyDate.split("-").join("")) - parseInt(b.partyDate.split("-").join(""));
    });

    //Then you map through the sortedReservations variable that contains the array of reservation objects that have been sorted chronologically:

    let reservationHTML = `<ul class="reservations">
        ${sortedReservations.map(reservation => `<li>
            Birthday party for ${reservation.childName} with ${reservation.childrenAttending} children attending at ${reservation.address} on ${reservation.partyDate}.
            <button class="reservation__delete" id="reservation--${reservation.id}"> Deny </button>
            </li>`).join("")
        } </ul>`;

    return reservationHTML;
};