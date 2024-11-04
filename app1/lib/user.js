const clientPromise = require("./mongodb");
const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

async function getUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db('todo-list'); // Replace with your actual database name
  return await db.collection('users').findOne({ email });
}

// create user
async function createUser(userData) {
  const client = await clientPromise;
  const db = client.db('todo-list'); // Replace with your actual database name
  const { insertedId } = await db.collection('users').insertOne(userData);
  return insertedId;
}

async function fetchUser(userid) { 
  const client = await clientPromise;
  const db = client.db("todo-list");
  
  const response = await db.collection('users').findOne({ _id: new ObjectId(userid) });  

  if (response) {
      return response.username;
  } else {
    return null;
  }

}

async function addTodo(todo, userid, _id) { 
  try { 

    const client = await clientPromise;
    const db = client.db("todo-list");
    const identifier = {user_id: new ObjectId(userid), _id: new ObjectId(_id) } 

    
    await db.collection('todos').updateOne(identifier, {$push: {data: todo}});
   
    return true;
  } catch (e) { 
    console.log(e)
    return false;
  }

}

async function addTodoList(todoList, userid) { 
  try { 

    const client = await clientPromise;
    const db = client.db("todo-list");

    const {insertedId }  = await db.collection('todos').insertOne({user_id: new ObjectId(userid), ...todoList});
   
    return new ObjectId(insertedId);
  } catch (e) { 
    console.log(e)
    return false;
  }
}

async function fetchTodo(userId, _id) {
  const client = await clientPromise;
  const db = client.db("todo-list");
  

  const response = await db.collection('todos').find({user_id: new ObjectId(userId)}).toArray(); 
  if (response) {

    return response;
  } else {
    return null;
  }
}

async function validateToken(token) { 
  // validate token using jwt
  try { 
    
    const payload =  jwt.verify(token, process.env.JWT_SECRET);
    const username = await fetchUser(payload.userId)
    if (username) { 

      return { status: 200, message: "is Logged in", username, userId: payload.userId};
    } else { 
      return { status: 404, message: "User not found"};
    }
  } catch(error) { 
    return {status: 404, message: error};
  }
}

async function updateTodoList(name, _id) { 
  
  try { 

    const client = await clientPromise;
    const db = client.db("todo-list");
    const identifier = { _id: new ObjectId(_id) } 

    await db.collection('todos').updateOne(identifier, {$set: {name}});
   
    return true;
  } catch (e) { 
    console.log(e)
    return false;
  }
}

async function deleteTodoList(_id) { 
    
    try { 
  
      const client = await clientPromise;
      const db = client.db("todo-list");
      const identifier = { _id: new ObjectId(_id) } 
  
      await db.collection('todos').deleteOne(identifier);
    
      return true;
    } catch (e) { 
      console.log(e)
      return false;
    }
}

async function updateTodo(todo, _id) { 
    
    try { 
      
      const client = await clientPromise;
      const db = client.db("todo-list");
      const identifier = { _id: new ObjectId(_id) } 
  
      await db.collection('todos').updateOne(identifier, {$set: {data: todo}});
    
      return true;
    } catch (e) { 
      console.log(e)
      return false;
    }
}
module.exports = { getUserByEmail, createUser, fetchUser,addTodo,fetchTodo, validateToken, addTodoList, updateTodoList, deleteTodoList, updateTodo};