// For this assignment you will be combining your knowledge of DOM access and events to build a todo app!

// As a user, you should be able to:

/*************************************
 ************************************* 
        FUNCTIONS
**************************************
**************************************/
var todos = [
    {name: 'Go get lunch', completed: false},
    {name: 'Feed cat', completed: false}
];


window.addEventListener('load', function(){
    for(var i = 0; i < todos.length; i++) {
        addTodoStartUp(todos[i].name, true);
    }
});


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
}

// Add Todo Function
function addTodoStartUp(message, fromLoad) {
    // Get todo list body
    var todoList = document.querySelector("#todoList");
    // Create new todo with user todo input
    var newTodo = createTodo(message, fromLoad);
    // Append new todo to todo list body
    todoList.appendChild(newTodo);
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
        removeTodo(e);
    });
    
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
});


// var todoLabels = document.querySelectorAll()


// Mark a todo as completed (cross out the text of the todo)
// Remove a todo

// var instructors = ["Elie", "Matt", "Tim"];

// localStorage.setItem("instructors", JSON.stringify(instructors));
// var jim = JSON.parse(localStorage.getItem("instructors"));
// console.log(jim)