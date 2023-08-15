
// Add tasks to an array
let tasks = [];

let nextTaskId = 0; // A counter for assigning unique IDs to tasks

// function that takes the users input and adds it it that task aray
function addTask(){
    // grab the user input from the element with the ID 'taskInput'
    const taskInput = document.getElementById('taskInput').value;
    if (taskInput.trim() !== ""){ // check that input is not empty
        // Create an object for the tasks added 
        const task ={
            id: nextTaskId++, // Assign a unique ID to this task
            text: taskInput,
            done: false
        };
        // Add the task object to the tasks array
        tasks.push(task);

        // Clear the input field
        document.getElementById('taskInput').value = ""; 

        // Call this after adding the task to the array to display tasks
        displayTasks(); 
    }

    console.log(tasks);
}


// Add an event listener to the element with ID 'addTaskButton'
// This will call the 'addTask' function when the button is clicked
document.getElementById('addTaskButton').addEventListener('click', addTask)



// Display Tasks being added
function displayTasks(){
    // Get the element with ID 'taskList' where the tasks will be displayed
    const taskList = document.getElementById('taskList');

    // Clear any existing tasks from the display
    taskList.innerHTML = ''; 

    // Loop through the tasks array
    for (let task of tasks){
        // Create a new list item element for each task
        let listItem = document.createElement('li');

        // Create a span element to hold the task text
        let taskSpan = document.createElement('span');
        taskSpan.textContent = task.text;

        // If the task is done, strike through the text
        if (task.done){
            taskSpan.style.textDecoration = "line-through";
        }

        // Create a "Done" button for each task
        let doneButton = document.createElement('button');
        doneButton.textContent = "Done";

        // Add a click event listener to mark the task as done
        doneButton.addEventListener('click', function(){
            markTaskAsDone(task.id); // Pass the unique ID of the clicked task
        });

        // Append the span and the button to the list item
        listItem.appendChild(taskSpan);
        listItem.appendChild(doneButton);

        // Append the list item to the task list in the HTML
        taskList.appendChild(listItem);
    }
}


function markTaskAsDone(taskId){
    // Find the task with the given ID ans set its "done" property to True
    for (let task of tasks){
        if (task.id === taskId){
            task.done = true;
            break;
        }
    }

    displayTasks(); // Update the display to reflect the change

}

//zzzzz