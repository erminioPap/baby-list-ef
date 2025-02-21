const firebaseConfig = {
  apiKey: "AIzaSyBWX8vPV34KkkHOZBTp280xgBpr7j7uOtA",
  authDomain: "babylistef.firebaseapp.com",
  databaseURL: "https://babylistef-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "babylistef",
  storageBucket: "babylistef.firebasestorage.app",
  messagingSenderId: "603347821148",
  appId: "1:603347821148:web:043ec755b52b2ca617fc99",
  measurementId: "G-L3FYK9K6EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to the 'babyList' node in Firebase
const babyListRef = database.ref("babylist");

// Function to load baby list items dynamically
function loadBabyList() {
    babyListRef.on("value", (snapshot) => {
        console.log("Data snapshot received:", snapshot.val());
        const table = document.getElementById("babyListTable");
        table.innerHTML = `
            <tr>
                <th>Picture</th>
                <th>Description & Link</th>
                <th>Action</th>
            </tr>
        `; // Reset table header
        if (!snapshot.exists()) {
            console.log("No data found in Firebase.");
            return;
        }
        snapshot.forEach((childSnapshot) => {
            const key = childSnapshot.key;
            const data = childSnapshot.val();
            
            // Create table row
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img src="${data.image}" alt="Item Image" width="60%"></td>
                <td><a href="${data.link}" style="color: white;">Link</a> - ${data.description}</td>
                <td><button onclick="removeItem('${key}')">I bought this</button></td>
            `;
            table.appendChild(row);
        });
    });
}
  
// Function to remove an item from Firebase
function removeItem(itemId) {
    if (confirm("Are you sure you bought this item?")) {
        database.ref("babylist/" + itemId).remove()
            .then(() => console.log("Item removed successfully"))
            .catch((error) => console.error("Error removing item: ", error));
    }
}

// Load items on page load
loadBabyList();
