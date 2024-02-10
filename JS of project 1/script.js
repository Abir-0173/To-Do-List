// Define UI Element
let form = document.querySelector('#task_form');
let taskInput = document.querySelector('#new_task');
let filter = document.querySelector('#task_filter');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');

//Define EventListener
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener("click", ClearTask)
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks)

//Define Function
function addTask(e) {
    // console.log(e);
    if (taskInput.value === '') {
        alert('You are adding empty task❗\n Please write your Task Name.');

    } else {
        // Create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));

        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = '❌';
        li.appendChild(link);

        taskList.appendChild(li);

        StoreTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
}


// REMOVE TASK FUNCTION 
function removeTask(e) {
    if (e.target.hasAttribute('href')) {
        if (confirm("Are You Sure?")) {
            let ele = e.target.parentElement;
            ele.remove();
            // console.log(ele);
            removeFromLS(ele);
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
function StoreTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));

        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = '❌';
        li.appendChild(link);

        taskList.appendChild(li);
    })

}


function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let li = taskItem;
    li.removeChild(li.lastChild); //<a>❌</a>

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}