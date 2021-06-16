import { getReservations, getClowns, saveCompletion, getCompletions, deleteReservation } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("reservation--")) {
        const [,reservationId] = click.target.id.split("--");
        deleteReservation(parseInt(reservationId));
    };
});

export const Reservations = () => {
    const reservations = getReservations();
    const clowns = getClowns();
    const completions = getCompletions();

    //Sorting through an array of objects by its property value by utilizing the sort() method as shown below which takes a callback function that
    //takes as parameters 2 objects (a,b) contained in the reservations array. Sorting through the partyDate property in the database to return the
    //sorted reservations to be displayed in chronological order. Need to implement parseInt() and split() methods to extract the integer from the
    //string value in database.
    //When 1 is returned(or a is > b), the function communicates to sort() that the object a takes precedence in sorting over the object b (ascending). Returning
    //-1 (a < b) would do the opposite of the chronological order(descending) by switching position of object a and b. The returned boolean value determines
    //the ascending or descending order.
    //The callback function could calculate other properties too, to handle the case where the date is the same, and sort by a secondary property.
    
    const sortedReservations = () => {
        let reservationsArraySorted = reservations.sort((a,b) => {
            return parseInt(a.partyDate.split("-").join("")) - parseInt(b.partyDate.split("-").join(""));
        });

        completions.map((completedRequest) => {
            reservationsArraySorted.map((reservation) => {
                if (parseInt(completedRequest.reservationId) === reservation.id) {
                    // you use indexOf because the request could be the first or somewhere in the middle, so we need to find the exact index
                    // of the request in order to remove it from the sorted array via the splice method.
                    let index = reservationsArraySorted.indexOf(reservation);
                    reservationsArraySorted.splice(index, 1);
                }
            });
        });
        return reservationsArraySorted;
    };
    
    const completedRequests = completions.sort((a,b) => {
        return parseInt(a.date_created.split("-").join("")) - parseInt(b.date_created.split("-").join(""))
    });

    //Then you map through the sortedReservations variable that contains the array of reservation objects that have been sorted chronologically:

    let reservationHTML = `<ul class="reservations">
        ${sortedReservations().map(reservation => `<li>
            Birthday party for ${reservation.childName} with ${reservation.childrenAttending} children attending at ${reservation.address} on ${reservation.partyDate}.
            <select class="clowns" id="clowns" reservation-childName="${reservation.childName}" date-reservation="${reservation.partyDate}">
                <option value="">Choose</option>
                ${clowns.map(clown => {
                    return `<option value="${reservation.id}--${clown.id}--${clown.name}">${clown.name}</option>`}).join("")}
            </select>
            <button class="reservation__delete" id="reservation--${reservation.id}"> Deny </button>
            </li>`).join("")    
        }
        
        ${completedRequests.map(completedRequest => `<li class="completedReservation">
        Birthday party for ${completedRequest.reservationChildName} has been completed on ${completedRequest.date_created} by ${completedRequest.clown}.
        <button class="reservation__delete" id="reservation--${completedRequest.id}"> Deny </button>
        </li>`).join("")
        }
        
        </ul>`;

    return reservationHTML;
};

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns") {
            const [reservationId, clownId, clownName] = event.target.value.split("--")
            const reservationChildName = event.target.getAttribute("reservation-childName");
            const reservationDate = event.target.getAttribute("date-reservation");

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                reservationId: reservationId,
                clownId: clownId,
                date_created: new Date().toLocaleDateString(),
                isCompleted: true,
                reservationChildName: reservationChildName,
                reservationDate: reservationDate,
                clown: clownName
             }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
             saveCompletion(completion);
        };
    }
);