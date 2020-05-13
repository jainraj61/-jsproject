// Selector
const todoinputselector = document.querySelector(".todo-input");
const todobuttonselector = document.querySelector(".todo-button");
const todolistselector = document.querySelector(".todo-list");
const todofilterselector = document.querySelector(".filter-todo");

// EventListener
document.addEventListener("DOMContentLoaded", getTodo);
todobuttonselector.addEventListener("click", addTodo);
todolistselector.addEventListener("click", deleteTodo);
todofilterselector.addEventListener("click", filterOption);

// Functions
function addTodo(event){
    event.preventDefault();
    //add todo list
    const todoDiv= document.createElement("div");
    todoDiv.classList.add("todo");
    const todoLi = document.createElement('li');
    todoLi.innerText= todoinputselector.value ;
    todoLi.classList.add('todo-item');
    todoDiv.appendChild(todoLi);
    //Add to local storage
    saveTodotolocalstorage(todoinputselector.value);
    // add checked button
    const completedButton= document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton);
    // add trash button
    const trashButton= document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton);
    // Append todo list to ul
    todolistselector.appendChild(todoDiv);
    //Clear input value
    todoinputselector.value= "";
}

//delete a todo

function deleteTodo(event){
    const item=event.target;
    if(item.classList[0]==="trash-button")
    {
        const todo=item.parentElement;
        //animation
        todo.classList.add("fall");
        removelocalstorage(todo);
        todo.addEventListener("transitionend",function(){
                todo.remove();
        });
    }
    if(item.classList[0]==="completed-button")
    {
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}

// Filter todos

function filterOption(e){
    const todos=todolistselector.childNodes;
    console.log("hello");
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains('completed'))
                {
                    todo.style.display = "flex";
                }
                else
                {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed'))
                {
                    todo.style.display = "flex";
                }
                else
                {
                    todo.style.display = "none";
                }
                break;          
        }
    });       
     
}

function saveTodotolocalstorage(todo){
    //check any todo array created before
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo(todo){
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        //add todo list
    const todoDiv= document.createElement("div");
    todoDiv.classList.add("todo");
    const todoLi = document.createElement('li');
    todoLi.innerText= todo;
    todoLi.classList.add('todo-item');
    todoDiv.appendChild(todoLi);
    // add checked button
    const completedButton= document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton);
    // add trash button
    const trashButton= document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton);
    // Append todo list to ul
    todolistselector.appendChild(todoDiv);
    });
}

function removelocalstorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}