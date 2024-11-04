import Link from "next/link";
import { useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { firestore } from "../lib/firebase";
import { nanoid } from "nanoid";

function LeftContainer(props) {
  const todoListNameRef = useRef(null);

  const handleAddNewList = async () => {
    const initTodoList = {
      _id: nanoid(),
      name: "New List",
      data: [],
      sort: null,
      filter: null,
    };

    try {
      const userDocRef = doc(firestore, "users", props.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      const newTodoLists = [...userData.TodoLists, initTodoList];

      updateDoc(userDocRef, {
        TodoLists: newTodoLists,
      }).then(() => { 
        console.log('added Todo List')
      });

      
      props.setTodoLists([...props.todoLists, initTodoList]);
      props.setActiveListId(initTodoList._id);

    } catch (e) {
      console.log(e);
    }
  };

 

  const handleDeletion = async (e) => {

    try { 

      if (props.todoLists.length === 1) { 
        alert("You must have at least one todo list");
        return;
      }
      
      const userDocRef = doc(firestore, "users", props.currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      
      const newTodoLists = userData.TodoLists.filter(
        (todoList) => todoList._id !== props.activeListId
      );
      
      updateDoc(userDocRef, { 
        TodoLists: newTodoLists
      }).then(() => { 
        console.log('deleted')

      })
      
  
      props.setActiveListId(newTodoLists[0]._id);
      props.setTodoLists(newTodoLists);
  
      e.stopPropagation();

    } catch (error) { 

    }
  };

  function RenderTodoLists({props}) {
    const [newName, setNewName] = useState('');
    const handleNameChange = (e) => {
        setNewName(e.target.value)
    };
    
    const handleNameSave = async () => {
      
      
      // Send request to backend to save name change
      try {   
        const userDocRef =  doc(firestore, "users", props.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();

        const newTodoLists = userData.TodoLists.map((todoList) => {
          if (todoList._id === props.activeListId) {
            return {
              ...todoList,
              name: todoListNameRef.current.value,
            };
          }
          return todoList;
        });

        updateDoc(userDocRef, {
          TodoLists: newTodoLists,
        }).then(() => {
          console.log("updated todo list name");
        });

      } catch (er) { 
        console.log(er)
      }
    };

    // useEffect(() => {
    //   // Re-focus on the active input when activeListId changes
    //   if (todoListNameRef.current) {
    //     todoListNameRef.current.focus();
    //   }
    // }, [props.activeListId, props.todoLists]);

    return (
      <div className="flex flex-col gap-1">
        {props.todoLists.map((todoList) => {
          return (
            <div
              className={`w-44 mx-auto px-2 py-3 rounded-md flex justify-between
            font-semibold transition cursor-pointer group bg-neutral-800
            ${
              todoList._id === props.activeListId
                ? "bg-yellow text-neutral-900"
                : "text-white"
            }`}
              key={todoList._id}
             
              onClick={() => {
                props.setActiveListId(todoList._id);
              }}
            >
              <input
                ref={
                  todoList._id === props.activeListId ? todoListNameRef : null
                }
                type="text"
                defaultValue={todoList.name}
                className={`w-36 bg-transparent outline-none cursor-pointer focus:cursor-text
            ${
              todoList._id === props.activeListId
                ? "pointer-events-auto"
                : "pointer-events-none"
            }`}
                onChange={handleNameChange}
                onBlur={handleNameSave}
              />

              <button
                className={`text-neutral-900 invisible ${
                  todoList._id === props.activeListId && "group-hover:visible"
                }`}
                onClick={handleDeletion}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  function UserProfile({props}) {
    <div style={{ marginTop: "39rem" }} className="ml-4">
      <div className="flex flex-row  items-center text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
          style={{ width: "40px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>

        <p className="ml-2">{props.username}</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 "
          style={{ width: "30px", marginLeft: "auto", marginRight: "1rem" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </div>
    </div>;
  }

  return (
    <div className="fixed left-0 top-0 w-52 h-full bg-neutral-800">
      <div className="mt-2 mb-10 ml-4 flex items-center gap-1">
        <img className="w-6 h-6" src="/favicon.ico" />
        <h1 className="text-white text-2xl font-bold">
          <Link href="/">Productivity Hub</Link>
        </h1>
      </div>

      <RenderTodoLists props={props} />

      <button className="text-white w-44 px-2 py-3" onClick={handleAddNewList}>
        + Add Todo List
      </button>

      <UserProfile props={props} />
    </div>
  );
}

export default LeftContainer;
