
// Add tasks to an array
let tasks = [];

// function that takes the users input and adds it it that task aray
function addTask(){
    // grab the user input from the element with the ID 'taskInput'
    const taskInput = document.getElementById('taskInput').value;
    if (taskInput.trim() !== ""){ // check that input is not empty
        // Create an object for the tasks added 
        const task ={
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
        // Set the text content of the list item to the 'text' property of the task
        listItem.textContent = task.text;
        // Append the list item to the task list in the HTML
        taskList.appendChild(listItem);
    }
}