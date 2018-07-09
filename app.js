/*************************************
 ************************************* 
        FUNCTIONS
**************************************
**************************************/


// Check to see if any todos in local, and setting todos.
if(localStorage.getItem("todos") != null) {
    var todos = JSON.parse(window.localStorage.getItem("todos"));
} else {
    var todos = [
        {name: 'Go get lunch', completed: false},
        {name: 'Feed cat', completed: false}
    ];
}


window.addEventListener('load', function(){
    for(var i = 0; i < todos.length; i++) {
       addTodoStartUp(todos[i].name, true);
    }

    // Original check off todos array to add custom styling that are saved in local storage as complete
    checked();

    // Adds event listeners to all todos, and applies custom checkbox styling when selected as complete, and remove styling when unchecked.
    addCompleteEventListener();
});

// Loops through all todos and checks if completed and adds styling to those that are.
function addCompleteEventListener() {
    // Set completed value when click on a todo
    var todosLabel = document.querySelectorAll('.todos_todo_label');
    for(var j = 0; j < todosLabel.length; j++) {
        todosLabel[j].addEventListener('click', function(e) {
            if(e.target.type === "checkbox") {
                var getParent = e.target.parentElement.parentElement;
                // Get position of todo in list, by checking how many siblings come before the todo.
                var position = 0;
                for (var i=0; (getParent=getParent.previousSibling); i++) {
                    position = i;
                }; 
                var getTodosCheckedCustom = document.querySelectorAll('.todos_todo_custom-checkbox');
                if(todos[position].completed === false) {
                    // update todos array
                    todos[position].completed = true;
                    // Add custom checkbox styling
                    getTodosCheckedCustom[position].classList.add('js-checked');
                } else {
                    // update todos array
                    todos[position].completed = false;
                    // Remove custom checkbox styling
                    getTodosCheckedCustom[position].classList.remove('js-checked');
                }
                addToLocalStorage();
            }
        });
    }
}


// Original check off todos array to add custom styling that are saved in local storage as complete
function checked() {
    var getTodosChecked = document.querySelectorAll('.todos_todo_checkbox');
    var getTodosCheckedCustom = document.querySelectorAll('.todos_todo_custom-checkbox');
    for(var i = 0; i < todos.length; i++) {
        if(todos[i].completed === true) {
            getTodosChecked[i].checked = true;
            getTodosCheckedCustom[i].classList.add('js-checked');
        } else {
            getTodosCheckedCustom[i].classList.remove('js-checked');
            getTodosChecked[i].checked = false;
        }
    }
}


// Add to local storage function
function addToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
    todos = JSON.parse(localStorage.getItem("todos"));
};

// Create todos function
function createTodo(message, fromLoad) {
    // Create div wrapper
    var div = document.createElement("div");
    div.classList.add("todos_todo");

    // Create label wrapper & append to div parent
    var label = document.createElement("label");
    label.classList.add("todos_todo_label");
    div.appendChild(label);
    
    // Create checkbox input & append to label parent
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.classList.add("todos_todo_checkbox");
    label.appendChild(input);
    
    // Create span(custom checkbox) & append to label parent
    var span = document.createElement("span");
    span.classList.add("todos_todo_custom-checkbox");
    label.appendChild(span);

    // Create p, add text for message argument and append to label parent
    var para = document.createElement("p");
    para.classList.add("todos_todo_task");
    // If this is a new todo, not a loaded todo from a new session, add it to the todos array.
    var inputText = message;
    if(!fromLoad) {
        todos.push({name: inputText, completed: false});
        // Update local storage with new todo
        addToLocalStorage();
    }
    para.innerText = message;
    label.appendChild(para);

    // Create delete button, add event listener, and append to div parent
    var deleteButton = document.createElement("button");
    deleteButton.classList.add("todo_todos_remove");
    deleteButton.setAttribute("id", "deleteButton");
    deleteButton.innerText = "X";
    deleteButton = addDeleteButtonEventListener(deleteButton);
    div.appendChild(deleteButton);

    // Return new todo div 
    return div;
}


// Add Todo Function
function addTodo() {
    // Get user todo input
    var userInput = document.getElementById('userInput').value;
    // Get todo list body
    var todoList = document.querySelector("#todoList");
    // Create new todo with user todo input
    var newTodo = createTodo(userInput, false);
    // Append new todo to todo list body
    todoList.appendChild(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

    addCompleteEventListener();
}

// Add Todo Function
function addTodoStartUp(message, fromLoad) {
    // Get todo list body
    var todoList = document.querySelector("#todoList");
    // Create new todo with user todo input
    var newTodo = createTodo(message, fromLoad);
    // Append new todo to todo list body
    todoList.appendChild(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


// Delete Todos function
function removeTodo(toBeRemovedElement) {
    // Get todo list
    var todoList = document.querySelector("#todoList");
    // Remove given elements parent element (the div wrapper)
    todoList.removeChild(toBeRemovedElement.target.parentElement); 
}

// Add Delete Button event listener to new todos
function addDeleteButtonEventListener(deleteButton) {
    deleteButton.addEventListener("click", function(e) {
        var getParent = e.target.parentElement;
        var position = 0;
        for (var i=0; (getParent=getParent.previousSibling); i++) {
            position = i;
        };
        todos.splice(position, 1);
        addToLocalStorage();
        removeTodo(e);
    });
    
    localStorage.setItem("todos", JSON.stringify(todos));
    return deleteButton;
}



/*************************************
 ************************************* 
            EVENT LISTENERS
**************************************
**************************************/

// Add Button Event listener
var addButton = document.getElementById('addButton');
addButton.addEventListener("click", function() {
    addTodo();
    localStorage.setItem("todos", JSON.stringify(todos));
});