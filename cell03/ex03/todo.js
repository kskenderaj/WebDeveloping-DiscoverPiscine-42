const list = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

// Load saved todos when page loads
window.onload = () => {
    let saved = getCookie("todos");
    if (saved) {
        let todos = JSON.parse(saved);
        todos.forEach(text => addTodo(text, false));
        sortTodos(); // sort after loading
    }
};

// Add new todo
newBtn.addEventListener("click", () => {
    let text = prompt("Enter a new TO DO:");
    if (text && text.trim() !== "") {
        addTodo(text.trim(), true);
        sortTodos(); // sort after adding
    }
});

// Function to create and insert a todo
function addTodo(text, save) {
    let todo = document.createElement("div");
    todo.className = "todo";
    todo.innerText = text;

    // Click event to delete
    todo.addEventListener("click", () => {
        if (confirm("Do you want to remove this TO DO?")) {
            todo.remove();
            saveTodos();
        }
    });

    // Insert at top temporarily
    list.insertBefore(todo, list.firstChild);

    // Save to cookies if needed
    if (save) {
        saveTodos();
    }
}

// Sort todos in descending order (biggest → smallest)
function sortTodos() {
    let todos = Array.from(list.children);

    todos.sort((a, b) => {
        let valA = a.innerText;
        let valB = b.innerText;

        // If both are numbers → compare numerically
        if (!isNaN(valA) && !isNaN(valB)) {
            return Number(valB) - Number(valA); // descending numbers
        }
        // Otherwise → compare as strings (case-insensitive)
        return valB.toLowerCase().localeCompare(valA.toLowerCase());
    });

    // Re-append sorted todos
    list.innerHTML = "";
    todos.forEach(todo => list.appendChild(todo));

    saveTodos();
}

// Save todos into cookie
function saveTodos() {
    let todos = [];
    document.querySelectorAll(".todo").forEach(todo => {
        todos.push(todo.innerText);
    });
    setCookie("todos", JSON.stringify(todos), 7);
}

// Cookie helper functions
function setCookie(name, value, days) {
    let d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));//Days to milliseconds/updates days to represent the expiration date
    let expires = "expires=" + d.toUTCString(); // Converts the date into a readable format for cookies
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let cookies = document.cookie.split(";");//Contains all cookies in one long string
    for (let cookie of cookies) {
        cookie = cookie.trim();//extra space removal
        if (cookie.indexOf(name + "=") === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return "";
}
