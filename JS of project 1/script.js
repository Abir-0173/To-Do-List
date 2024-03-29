// Define UI Element
let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let filter = document.querySelector('#task_filter');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');

//Define EventListener
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener("click", ClearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

//Define Function
function addTask(e) {
    if (taskInput.value === '') {
        alert('You are adding an empty task❗\nPlease write your Task Name.');
    } else {
        let li = document.createElement('li');
        let createCheckBox = document.createElement("INPUT");
        createCheckBox.setAttribute("type", "checkbox");
        li.appendChild(createCheckBox);

        // Store the task name and checkbox status in local storage
        StoreTaskInLocalStorage(taskInput.value, createCheckBox.checked);

        li.appendChild(document.createTextNode(taskInput.value + " "));
        
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = '❌';
        li.appendChild(link);

        taskList.appendChild(li);
        taskInput.value = '';
    }
    e.preventDefault();
}



// REMOVE TASK FUNCTION 
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm("Are You Sure?")) {
            let ele = e.target.parentElement;
            let taskName = ele.firstChild.nextSibling.textContent.trim();
            ele.remove();
            removeFromLS(taskName);
        }
    }
}



//clear Task ----
function ClearTask(e) {
    //Alert
    if (confirm('Are you Sure to clear All❗')) {
        // console.log();
    }

    // taskList.innerHTML ="";

    //FASTER 
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}


//Filter Task
//Search Filter

function filterTask(e) {
    let text = e.target.value.toLowerCase();
    // console.log(text);
    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        // != -1  means items found (word mach to word)
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}


// Store in Local Storage
function StoreTaskInLocalStorage(task, checked) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    let taskObject = {
        name: task,
        isChecked: checked
    };
    tasks.push(taskObject);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//---------------
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    taskList.innerHTML = '';

    tasks.forEach(taskObject => {
        let li = document.createElement('li');
        let createCheckBox = document.createElement("INPUT");
        createCheckBox.setAttribute("type", "checkbox");
        createCheckBox.checked = taskObject.isChecked || false;
        li.appendChild(createCheckBox);

        li.appendChild(document.createTextNode(taskObject.name + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = '❌';
        li.appendChild(link);

        taskList.appendChild(li);
    });
}



function removeFromLS(taskName) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // Remove the task object from the array based on the task name
    tasks = tasks.filter(task => task.name !== taskName);

    // Update the local storage with the updated tasks array
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
