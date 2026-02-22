// 1. VARIABLES & 2. STRINGS
let internName = "Future Engineer"; 
let greeting = "Welcome to my dashboard, " + internName + "!";
document.getElementById('welcome-msg').textContent = greeting;


// 3. OBJECTS
const userStats = {
    role: "Frontend Intern",
    status: "Learning",
    week: 5
};
document.getElementById('user-info').textContent = `Role: ${userStats.role} | Week: ${userStats.week}`;


// 4. ARRAYS & 5. LOOPS
const topicsLearned = ["Variables", "Numbers", "Strings", "Boolean", "Comparisons", "Objects", "Arrays", "Loops", "Functions"];

const listContainer = document.getElementById('topicList');

for (let i = 0; i < topicsLearned.length; i++) {
    let li = document.createElement('li');
    li.textContent = topicsLearned[i];
    listContainer.appendChild(li);
}


// 6. FUNCTIONS, 7. NUMBERS, 8. BOOLEANS, & 9. COMPARISONS
function checkAge() {
    // Get number from input
    let age = Number(document.getElementById('ageInput').value);
   
    
    // Comparison resulting in a Boolean
    let isAdult = age >= 18; 
    
    if (isAdult) {
        document.getElementById('ageResult').textContent = "Status: Access Granted (Adult)";
        document.getElementById('ageResult').style.color = "green";
    } else {
        document.getElementById('ageResult').textContent = "Status: Access Denied (Minor)";
        document.getElementById('ageResult').style.color = "red";
    }
}