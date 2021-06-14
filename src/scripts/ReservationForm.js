import { sendReservation } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");


mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitReservation") {
        // Get what the user typed into the form fields
        const userParentName = document.querySelector("input[name='parentName']").value
        const userChildName = document.querySelector("input[name='childName']").value
        const userChildrenAttending = document.querySelector("input[name='childrenAttending']").value
        const userAddress = document.querySelector("input[name='reservationAddress']").value
        const userReserveDate = document.querySelector("input[name='reserveDate']").value
        const userDuration = document.querySelector("input[name='duration']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: userParentName,
            childName: userChildName,
            childrenAttending: userChildrenAttending,
            address: userAddress,
            reserveDate: userReserveDate,
            duration: userDuration
        };

        // Send the data to the API for permanent storage
        sendReservation(dataToSendToAPI);
    };
});

export const ReservationForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="parentName">Parent Name</label>
            <input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childName">Child Name</label>
            <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childrenAttending">Number of Children Attending</label>
            <input type="text" name="childrenAttending" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationAddress">Address</label>
            <input type="text" name="reservationAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reserveDate">Reservation Date</label>
            <input type="number" name="reserveDate" class="input" />
        </div>
        <div class="field">
            <label class="label" for="duration">Duration</label>
            <input type="date" name="duration" class="input" />
        </div>
        <button class="button" id="submitReservation">Submit Reservation</button>
    `

    return html;
};