import { useRef, useState, useEffect } from "react";
import Priority from "./Priority";
import { nanoid } from "nanoid";
import Title from "./Title";
import DateInput from "./Date";
import Tags from "./Tags";
import Buttons from "./Buttons";
import axios from "axios";
import Cookies from "js-cookie";
import { firestore } from "../../lib/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const initTodo = {
  name: "",
  priority: "low",
  dateStart: "",
  dateEnd: "",
  tags: [],
  checked: false,
};

function TodoCreator(props) {
  const [todo, setTodo] = useState(props.displayedTodo);
  const nameRef = useRef(null);
  const dateStartRef = useRef(null);
  const dateEndRef = useRef(null);
  const tagsRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  async function handleSubmit() {
    if (todo.name == "") return;

    // reset
    nameRef.current.focus();
    nameRef.current.value = "";
    dateStartRef.current.value = "";
    dateEndRef.current.value = "";
    tagsRef.current.value = "";
    props.setDisplayedTodo(initTodo);

    if (props.creatorState === "add") {
      try {
        const userDocRef = doc(firestore, "users", props.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        const newTodoLists = userData.TodoLists.map((todoList) => {
          if (todoList._id === props.activeListId) {
            return { ...todoList, data: [todo, ...todoList.data] };
          }
          return todoList;
        });

        updateDoc(userDocRef, {
          TodoLists: newTodoLists,
        }).then(() => {
          console.log("added Todo");
        });
        props.setTodoLists(newTodoLists);
        setTodo(initTodo);
        props.setCreatorState("hidden");
      } catch (error) {
        alert(error);
      }

    } else if (props.creatorState === "edit") {
      try { 
        const userDocRef = doc(firestore, "users", props.currentUser.uid);

        const newTodoLists = props.todoLists.map((todoList) => {
          if (todoList._id === props.activeListId) {
            const newTodoListData = todoList.data.map((t) => {
              if (t === props.displayedTodo) {
                return todo;
              }
              return t;
            });
            return { ...todoList, data: newTodoListData };
          }
          return todoList;
        });

        updateDoc(userDocRef, { 
          TodoLists: newTodoLists
        }).then(() => { 
          console.log("updated todo list")
        });

        props.setTodoLists(newTodoLists);
        props.setCreatorState("hidden");
      } catch (e) { 
        console.log("error editing todo")
      }

    }
  }

  return (
    <>
      <div
        className="w-screen h-screen fixed top-0 left-0 bg-black z-10 opacity-50"
        onClick={() => {
          props.setCreatorState("hidden");
          props.setDisplayedTodo(initTodo);
        }}
      />
      <div
        className="w-[48%] h-max px-10 py-8 text-white bg-neutral-800
        rounded-lg fixed left-[26%] z-20 flex flex-col gap-5 outline-none top-16"
      >
        <Title
          todo={todo}
          setTodo={setTodo}
          nameRef={nameRef}
          handleSubmit={handleSubmit}
        />
        <div className="flex gap-10">
          <DateInput
            todo={todo}
            setTodo={setTodo}
            dateStartRef={dateStartRef}
            dateEndRef={dateEndRef}
          />
          <div className="flex flex-col w-1/2 gap-10">
            <Priority
              todo={todo}
              setTodo={setTodo}
              todoLists={props.todoLists}
              setTodoLists={props.setTodoLists}
            />
            <Tags
              todo={todo}
              setTodo={setTodo}
              tagsRef={tagsRef}
              handleSubmit={handleSubmit}
            />
            <Buttons
              creatorState={props.creatorState}
              setCreatorState={props.setCreatorState}
              setDisplayedTodo={props.setDisplayedTodo}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoCreator;
