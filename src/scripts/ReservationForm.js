import { sendReservation } from "./dataAccess.js";

const mainContainer = document.querySelector("#container");

// What this is doing is getting the input element who has a property of name and the value of name is parentName
// document.querySelector("input[name='parentName']")
// on a raw xpath this query would be like this: //input[@name='parentName']
//xpath is a query language for selecting elements in a webpage from an html or xml document, using brackets allows you to find an element
//by using a specific property value of name in example below: 

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitReservation") {
        // Get what the user typed into the form fields
        const userParentName = document.querySelector("input[name='parentName']").value
        const userChildName = document.querySelector("input[name='childName']").value
        const userChildrenAttending = document.querySelector("input[name='childrenAttending']").value
        const userAddress = document.querySelector("input[name='reservationAddress']").value
        const userPartyDate = document.querySelector("input[name='partyDate']").value
        const userDuration = document.querySelector("input[name='duration']").value
        const userDateReserved = document.querySelector("input[name='dateReserved']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            parentName: userParentName,
            childName: userChildName,
            childrenAttending: userChildrenAttending,
            address: userAddress,
            partyDate: userPartyDate,
            duration: userDuration,
            dateReserved: userDateReserved
        };

        // Send the data to the API for permanent storage
        sendReservation(dataToSendToAPI);
    };
});

export const ReservationForm = () => {
    let html = `
        <div class="field">
            <label class="label" for="parentName">Parent Name:</label>
            <input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childName">Child Name:</label>
            <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childrenAttending">Number of Children Attending:</label>
            <input type="number" name="childrenAttending" class="input" />
        </div>
        <div class="field">
            <label class="label" for="reservationAddress">Party Address:</label>
            <input type="text" name="reservationAddress" class="input" />
        </div>
        <div class="field">
            <label class="label" for="partyDate">Party Date:</label>
            <input type="date" name="partyDate" class="input" />
        </div>
        <div class="field">
            <label class="label" for="duration">Duration (hours):</label>
            <input type="number" name="duration" class="input" />
        </div>
        <div class="field">
            <label class="label" for="dateReserved">Date Reserved:</label>
            <input type="date" name="dateReserved" class="input" />
        </div>
        <button class="button" id="submitReservation">Reserve Party</button>
    `

    return html;
};