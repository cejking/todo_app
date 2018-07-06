// For this assignment you will be combining your knowledge of DOM access and events to build a todo app!

// As a user, you should be able to:

/*************************************
 ************************************* 
        FUNCTIONS
**************************************
**************************************/
// Create todos function
function createTodo(message) {
    var div = document.createElement("div");
    div.classList.add("todos_todo");

    var label = document.createElement("label");
    
    label.classList.add("todos_todo_label");
    div.appendChild(label);
    
    var input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.classList.add("todos_todo_checkbox");
    label.appendChild(input);
    
    var span = document.createElement("span");
    span.classList.add("todos_todo_custom-checkbox");
    label.appendChild(span);

    var para = document.createElement("p");
    para.classList.add("todos_todo_task");
    para.innerText = message;
    todos.push({todo: para.innerText, complete: false});
    label.appendChild(para);

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("todo_todos_remove");
    deleteButton.setAttribute("id", "deleteButton");
    deleteButton.innerText = "X";
    deleteButton = addDeleteButtonEventListener(deleteButton);
    div.appendChild(deleteButton);

    return div;
}


// Add Todo Function
function addTodo() {
    var userInput = document.getElementById('userInput').value;
    var todoList = document.querySelector("#todoList");
    var newTodo = createTodo(userInput);
    todoList.appendChild(newTodo);
}


// Delete Todos function
function removeTodo(toBeRemovedElement) {
    var todoList = document.querySelector("#todoList");
    todoList.removeChild(toBeRemovedElement.target.parentElement); 
}

// Add Delete Button event listener
function addDeleteButtonEventListener(deleteButton) {
    deleteButton.addEventListener("click", function(e) {
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

// Delete Buttons Event listeners
var deleteButtons = document.querySelectorAll('.todo_todos_remove');
for(var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function(e) {
        removeTodo(e);
    });
}

// var todoLabels = document.querySelectorAll()


// Mark a todo as completed (cross out the text of the todo)
// Remove a todo

var instructors = ["Elie", "Matt", "Tim"];

localStorage.setItem("instructors", JSON.stringify(instructors));
var jim = JSON.parse(localStorage.getItem("instructors"));
console.log(jim)