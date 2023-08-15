
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
        saveTasks();

        // Clear the input field
        document.getElementById('taskInput').value = ""; 

        // Call this after adding the task to the array to display tasks
        displayTasks(tasks); 
    }

    console.log(tasks);
}


// Add an event listener to the element with ID 'addTaskButton'
// This will call the 'addTask' function when the button is clicked
document.getElementById('addTaskButton').addEventListener('click', addTask)



// Display Tasks being added
function displayTasks(taskArray){
    // Get the element with ID 'taskList' where the tasks will be displayed
    const taskList = document.getElementById('taskList');

    // Clear any existing tasks from the display
    taskList.innerHTML = ''; 

    // Loop through the tasks array
    for (let task of taskArray){
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


        // Create a "Delete" button for each task
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';


        // Add a click event listener to delete the task
        deleteButton.addEventListener('click',function(){
            deleteTask(task.id);
        });



        // Append the span and the buttons to the list item
        listItem.appendChild(taskSpan);
        listItem.appendChild(doneButton);
        listItem.appendChild(deleteButton);

        // Append the list item to the task list in the HTML
        taskList.appendChild(listItem);
    }
}


function markTaskAsDone(taskId){
    // Find the task with the given ID ans set its "done" property to True
    for (let task of tasks){
        if (task.id === taskId){
            task.done = true;
            saveTasks();
            break;
        }
    }

    displayTasks(tasks); // Update the display to reflect the change

}



// function to Delete a task
function deleteTask(taskId){
    // Find the task with the given ID and remove it from the array
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].id === taskId){
            tasks.splice(i, 1) // removes the task at this index
            saveTasks();
            break;
        }
    }

    displayTasks(tasks); // Update the display to reflect the change
}






// function to filter the tasks based on their status
function filterTasks(status){
    let filteredTasks = [] // An array to store the filtered tasks

    // Loop through the tasks array
    for (let i = 0; i< tasks.length; i++){
        // Check the status parameter and compare with the 'done' property of the task
        if (status === "all" || (status === "completed" && tasks[i].done) || (status == "pending" && !tasks[i].done)){
            // If the condition matches, add the task to the filteredTasks array
            filteredTasks.push(tasks[i]);
        }
    }
    // call the displayTasks function, passing in the filteredTasks
    displayTasks(filteredTasks)
}







// Function to save the current tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Use 'tasks' instead of 'task'
  }
  
  // Function to load the tasks from local storage when the page is loaded.
  function loadTasks() {
    const savedTasks = localStorage.getItem('tasks'); // This should match the key used in saveTasks
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
      displayTasks(tasks);
    }
  }
  
  loadTasks(); // Call this at the start of your script
  