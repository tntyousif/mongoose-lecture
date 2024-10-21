/*------------------------------ Starter Code ------------------------------*/

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const Todo = require('./models/todo.js');
const User  = require('./models/user.js')

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  await runQueries()

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
  process.exit();
};


connect()

/*----------------------------- Query Functions -----------------------------*/

const createTodo = async () => {
  const todoData = {
    text: "learn React",
    isComplete: false,
  };
  const todo = await Todo.create(todoData);
  console.log("New todo:", todo);
};

const findTodos = async () => {
  const todos = await Todo.find({}).populate("assignee");
  console.log("All todos:", todos);
};

const creatSubTasck = async () => {
    const todoId = '6715f77497efe4eb8926218a'
    const todo = await Todo.findById(todoId);

    const subtaskData = {
        text: "Learn how props work",
        isComplete: false,
    };

    // Push the new sub-task data into the subTasks array on the todo:
  const subtask = todo.subtasks.push(subtaskData);
  // Save the parent document:
  await todo.save();
  console.log("Modified todo:", todo);

 
}; 

//find one subtask
const findSubtask = async () => {
    const todoId = '6715f77497efe4eb8926218a';  // Replace with an existing Todo ID
    const subTaskId = '6715ff81bb401c46fdc23679'; // Replace with an existing Subtask ID
  
  const todo = await Todo.findById(todoId);
  const subTask = todo.subtasks.id(subTaskId);

  console.log('Subdocumrnt:', subTask);
}

// delete a sub task
const removeSubtask = async () => {
    const todoId = '6715f77497efe4eb8926218a';  // Replace with an existing Todo ID
    const subTaskId = '67160f4353e77142e648b190'; // Replace with an existing Subtask ID
  
    const todo = await Todo.findById(todoId);
    todo.subtasks.pull(subTaskId);
    await todo.save();

    console.log('Updated document:', todo);
}

//update sub task
const updateSubtask = async () => {
    const todoId = '6715f77497efe4eb8926218a';  // Replace with an existing Todo ID
    const subtaskId = '671606a31ec52aab7ccaa2be'; // Replace with an existing Subtask ID
  
    const todo = await Todo.findById(todoId);
    const subtask = todo.subtasks.id(subtaskId);
  
    subtask.isComplete = true;
    await todo.save();
  
    console.log('Updated document:', todo);
}


//find parent from subtask
const findParentAndRemoveSubtask = async  () => {
    const todo = await Todo.findOne({
      'subtasks.text': 'Learn how props work'
    });

    const subtask = todo.subtasks.find((subTask) => {
        return subTask.text === 'Learn how props work'
    });
    // console.log('subtask:', subtask);
    // console.log("===========")

    subtask.deleteOne();

    await todo.save();
    console.log('Updated todo:', todo);
};

const createUser = async () => {
    const userData = {
        name: 'Alex',
        email: 'alex@mail.com'
    };
    const user = await User.create(userData);
    console.log("New user:", user);
}

assignTodo = async () => {
    const todoId = '6715f77497efe4eb8926218a';
    const userId ='67162895d935891711c05005';

    const updatedTodo = await Todo.findByIdAndUpdate(
        todoId,
        { assignee: userId },
        { new: true }
    );

    console.log('Updated document:', updatedTodo);
};



//todo id = 6715f77497efe4eb8926218a
// subtask id = 67160f5d18436c691d085428
// user id = 67162895d935891711c05005
/*------------------------------- Run Queries -------------------------------*/

const runQueries = async () => {
  console.log('Queries running.');
//  await createTodo();
 await findTodos();
//  await creatSubTasck();
//  await findSubtask();
// await removeSubtask();
// await updateSubtask();
// await findParentAndRemoveSubtask();
// await createUser();
// await assignTodo();
};