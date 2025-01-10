document.getElementById("lightTheme").addEventListener("click", function () {
  document.body.className = "light-theme";
});

document.getElementById("darkTheme").addEventListener("click", function () {
  document.body.className = "dark-theme";
});

document.getElementById("happyTheme").addEventListener("click", function () {
  document.body.className = "happy-theme";
});

document.getElementById("sadTheme").addEventListener("click", function () {
  document.body.className = "sad-theme";
});

document.getElementById("coolTheme").addEventListener("click", function () {
  document.body.className = "cool-theme";
});
// Array to store form data objects
let formDataArray = [];

document
  .getElementById("cardForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const formData = new FormData(this); // Create a new FormData object from the form
    let formDataObject = {}; // Object to store form data

    // Log each form field's value
    for (let [key, value] of formData.entries()) {
      // Check if the field is a File object
      if (value instanceof File) {
        formDataObject[key] = value.name; // Store only the file name
      } else {
        formDataObject[key] = value; // Store other field values as is
      }
    }

    // Add the formDataObject to the formDataArray
    formDataArray.push(formDataObject);

    // Create a new Bootstrap card element
    let card = document.createElement("div");
    card.className = "card bg-dark text-white my-5";
    card.style.width = "35rem";
    card.innerHTML = `
    <img src="images/${formDataObject.image}" class="card-img" alt="Card image">
    <div class="card-img-overlay" style="background-color: rgba(0, 0, 0, 0.3)">
      <h5 class="card-title">${formDataObject.title}</h5>
      <p class="card-text description">${formDataObject.description}</p>
      <p class="card-text event">Event: ${formDataObject.event}</p>
      <p class="card-text nearest-place">Nearest Place: ${formDataObject.nearestPlace}</p>
      <p class="card-text date">Date: ${formDataObject.date}</p>
      <p class="card-text time">Time: ${formDataObject.time}</p>
      <div class="card-body">
        <button type="button" class="btn btn-primary edit-btn">Edit</button>
        <button type="button" class="btn btn-danger delete-btn">Delete</button>
      </div>
    </div>
  `;

    // Append the card to the card container
    document.getElementById("cardContainer").appendChild(card);

    // Print all stored form data
    console.log("All stored form data:");
    formDataArray.forEach((formDataObject, index) => {
      console.log(`Submission ${index + 1}:`);
      for (let key in formDataObject) {
        console.log(`${key}: ${formDataObject[key]}`);
      }
      console.log("-----");
    });

    // Reset the form after submission
    this.reset();
  });

// Event delegation to handle edit and delete button clicks
document
  .getElementById("cardContainer")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-btn")) {
      // Handle edit button click
      // You can add your edit logic here
      console.log("Edit button clicked");
    } else if (event.target.classList.contains("delete-btn")) {
      // Handle delete button click
      const card = event.target.closest(".card");
      const index = Array.from(card.parentNode.children).indexOf(card);
      formDataArray.splice(index, 1); // Remove the corresponding form data object from the array
      card.remove(); // Remove the card from the DOM
      console.log("Card deleted");
    }
  });

// Function to filter cards based on search query and filter option
function filterCards(searchQuery, filterOption) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    const description = card
      .querySelector(".description")
      .textContent.toLowerCase();
    const event = card.querySelector(".event").textContent.toLowerCase();
    const nearestPlace = card
      .querySelector(".nearest-place")
      .textContent.toLowerCase();

    if (
      ((filterOption === "all" || filterOption === "title") &&
        title.includes(searchQuery)) ||
      ((filterOption === "all" || filterOption === "description") &&
        description.includes(searchQuery)) ||
      ((filterOption === "all" || filterOption === "event") &&
        event.includes(searchQuery)) ||
      ((filterOption === "all" || filterOption === "nearestPlace") &&
        nearestPlace.includes(searchQuery))
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Event listener for search input
document.getElementById("searchInput").addEventListener("input", function () {
  const searchQuery = this.value.trim().toLowerCase();
  const filterOption = document.getElementById("filterSelect").value;
  filterCards(searchQuery, filterOption);
});

// Event listener for filter select
document.getElementById("filterSelect").addEventListener("change", function () {
  const searchQuery = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const filterOption = this.value;
  filterCards(searchQuery, filterOption);
});

// Event listener for delete all cards button
document
  .getElementById("deleteAllCardsBtn")
  .addEventListener("click", function () {
    // Remove all cards from the DOM
    document.getElementById("cardContainer").innerHTML = "";

    // Clear the formDataArray
    formDataArray = [];

    // Log confirmation
    console.log("All cards deleted");
  });

// Edit button functionality
document
  .getElementById("cardContainer")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-btn")) {
      // Get the card element
      const card = event.target.closest(".card");

      // Fill the form with the values of the card
      document.getElementById("title").value =
        card.querySelector(".card-title").textContent;
      document.getElementById("description").value =
        card.querySelector(".description").textContent;
      document.getElementById("event").value = card
        .querySelector(".event")
        .textContent.replace("Event: ", "");
      document.getElementById("nearestPlace").value = card
        .querySelector(".nearest-place")
        .textContent.replace("Nearest Place: ", "");
      document.getElementById("date").value = card
        .querySelector(".date")
        .textContent.replace("Date: ", "");
      document.getElementById("time").value = card
        .querySelector(".time")
        .textContent.replace("Time: ", "");

      // Show the "Update Card" button
      document.getElementById("updateCardBtn").classList.remove("d-none");
      document.getElementById("updateCardBtn").dataset.index = Array.from(
        card.parentNode.children
      ).indexOf(card);
    }
  });

// Update Card button functionality
document.getElementById("updateCardBtn").addEventListener("click", function () {
  const index = parseInt(this.dataset.index);
  const card = document.getElementById("cardContainer").children[index];

  // Update the card with the new values from the form
  card.querySelector(".card-title").textContent =
    document.getElementById("title").value;
  card.querySelector(".description").textContent =
    document.getElementById("description").value;
  card.querySelector(".event").textContent =
    "Event: " + document.getElementById("event").value;
  card.querySelector(".nearest-place").textContent =
    "Nearest Place: " + document.getElementById("nearestPlace").value;
  card.querySelector(".date").textContent =
    "Date: " + document.getElementById("date").value;
  card.querySelector(".time").textContent =
    "Time: " + document.getElementById("time").value;

  // Hide the "Update Card" button
  this.classList.add("d-none");

  // Reset the form
  document.getElementById("cardForm").reset();
});
