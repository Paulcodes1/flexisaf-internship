// --- 1. DOM SELECTORS ---
const input = document.getElementById('itemInput');
const addBtn = document.querySelector('#addBtn'); // Using querySelector for variety
const list = document.getElementById('itemList');
const statusSpan = document.querySelector('#status-text span');
const themeBtn = document.getElementById('themeBtn');

// --- 2. CALLBACK FUNCTIONS ---
// We define these to pass into our event listeners later
const addItem = () => {
    const text = input.value;
    if (text === "") return alert("Please enter a value!");

    // --- 3. DOM MANIPULATION (Creating Elements) ---
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        ${text} 
        <button class="delete-btn">Remove</button>
    `;

    // Append the new element to the DOM tree
    list.appendChild(li);
    
    // Update text content (Manipulation)
    statusSpan.innerText = "Item Added!";
    statusSpan.style.color = "green";

    // Clear input
    input.value = "";
};

// --- 4. DOM EVENTS ---
// Responding to a button click
addBtn.addEventListener('click', addItem);

// Responding to the 'Enter' key inside the input
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});

// Event Delegation (Advanced DOM Event usage)
list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const itemToRemove = e.target.parentElement;
        list.removeChild(itemToRemove); // Removing a node from the DOM
        statusSpan.innerText = "Item Removed";
        statusSpan.style.color = "red";
    }
});

// Changing Styles via DOM
themeBtn.addEventListener('click', () => {
    document.body.style.backgroundColor = 
        document.body.style.backgroundColor === 'black' ? '#f0f2f5' : 'black';
});