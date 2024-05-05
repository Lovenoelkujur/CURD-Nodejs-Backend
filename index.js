const fs = require("fs");
const { stringify } = require("querystring");
const taskData = "./data.txt";

/*
    function is used to generate an array of tasks from the taskData
*/
const taskArray = (taskData) => {
    const data = readTask(taskData);
    const result = JSON.stringify(data);
    const mark = result.slice(1, result.length - 1);
    const resultArray = mark.split("\\n");
    const filterResult = resultArray.filter((elem) => elem !== "");

    return filterResult;
}

/*
    function is used to overwrite all the data that currently exists in the file
*/
const overwriteData = (taskData, arr) => {
    arr.push("");
    const enterTask = arr.join("\n");
    try {
        fs.writeFileSync(taskData, enterTask);
    } 
    catch (error) {
        console.log(error);
    }
}

/*
    Add a new task
*/
const addTask = (taskData, enterTask) => {
    try {
        fs.appendFileSync(taskData, `${enterTask} \n`);
        console.log("Task Added Sucessfully");
    } 
    catch (error) {
        console.log(error);
    }
}

/*
    Read Task
*/
const readTask = (taskData) => {
    try {
        const data = fs.readFileSync(taskData, {encoding: "utf-8"});
        return data;
    } 
    catch (error) {
        console.log(error);
        return null;
    }
}

/*
    Marked Task Complete
*/
const markedAsTaskComplete = (taskData, taskName) => {
   const data = taskArray(taskData);

   const mapResult = data.map((elem) => {
    if(elem.trim() === taskName.trim()){
        const taskComplete = `[${taskName}] - Task-Complete`;
        return taskComplete;
    }
    return elem;
   })
   overwriteData(taskData, mapResult)
}

/*
    Delete Task
*/
const deleteTask = (taskData, taskName) => {
    const data = taskArray(taskData);

    // const trimTaskName = taskName.trim().toLowerCase();

    const filterResult = data.filter((elem) => elem.trim().toLocaleLowerCase() !== taskName.trim().toLowerCase());

    overwriteData(taskData, filterResult);
    console.log("Task Deleted Successfully");
    
}

// addTask(taskData, "I'm Task-2.");
// addTask(taskData, "I'm Task-2.");

// const readTaskData = readTask(taskData);
// console.log(readTaskData);

// addTask(taskData, "Task-Mark")
// markedAsTaskComplete(taskData, "Task-Mark");
// const ans = readTask(taskData);
// console.log(ans);

// addTask(taskData, "Task to Delete");
// const readTaskData = readTask(taskData);
// console.log(readTaskData);
deleteTask(taskData, "Task to Delete");
