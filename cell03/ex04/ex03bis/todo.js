//Wrap in jQuery ready
$(document).ready(function () {
    const $list = $("#ft_list");  //Use jQuery selector for list container
    const cookieName = "todos";

    //Load todos from cookies
    function getCookie(name) {
        let cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.indexOf(name + "=") === 0) {
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
        return "";
    }

    //Save todos as cookie
    function setCookie(name, value, days) {
        let d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
    }

    //Load tasks from cookie on page load
    function loadTodos() {
        let saved = getCookie(cookieName);
        if (saved) {
            let todos = JSON.parse(saved);
            for (let todo of todos) {
                addTodo(todo, false);
            }
        }
    }

    //Save tasks into cookie
    function saveTodos() {
        let todos = [];
        $(".todo").each(function () {   //jQuery loop over todos
            todos.push($(this).text());
        });
        setCookie(cookieName, JSON.stringify(todos), 7);
    }

    //Create and add a todo
    function addTodo(text, save = true) {
        let $todo = $("<div></div>")     //Create div with jQuery
            .addClass("todo")
            .text(text);

        //Click handler to remove todo
        $todo.on("click", function () {
            if (confirm("Do you want to remove this TO DO?")) {
                $(this).remove();
                saveTodos();
            }
        });

        // Add todo at top
        $list.prepend($todo);

        if (save) saveTodos();
    }

    //New button handler
    $("#newBtn").on("click", function () {
        let text = prompt("Enter your new TO DO:");
        if (text && text.trim() !== "") {
            addTodo(text.trim());
        }
    });

    //Load existing todos
    loadTodos();
});

