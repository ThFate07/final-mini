import Checkbox from "../Checkbox";
import { firestore } from "../../lib/firebase";
import Date from "./Date";
import Tags from "./Tags";
import axios from "axios";
import Cookies from "js-cookie";
import { doc, updateDoc } from "firebase/firestore";
function Todo(props) {
  const handleDeleteTodo = async (e) => {
    

    try {
      
      const newTodoLists = props.todoLists.map((todoList) => {
        if (todoList._id === props.activeListId) {
          const newTodoListData = todoList.data.filter((todo) => todo !== props.todo);
          return { ...todoList, data: newTodoListData };
        }
        return todoList;
      });

      const userDocRef = doc(firestore, "users", props.currentUser.uid);
  
      updateDoc(userDocRef, { 
        TodoLists: newTodoLists
      }).then(() => { 
        console.log('deleted todo')
      });

      props.setTodoLists(newTodoLists);
      e.stopPropagation();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-[35rem] h-20 px-3 rounded-lg bg-neutral-800 text-white relative
      flex items-center gap-3 cursor-pointer group"
      onClick={() => {
        props.setCreatorState("edit");
        console.log(props.todo);
        props.setDisplayedTodo(props.todo);
      }}
    >
      <button
        className="absolute right-3 top-2
        text-neutral-800 group-hover:text-neutral-300 transition "
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteTodo(e);
        }}
      >
        ✕
      </button>
      <Checkbox
        currentUser={props.currentUser}
        todo={props.todo}
        todoLists={props.todoLists}
        setTodoLists={props.setTodoLists}
        activeListId={props.activeListId}
        checked={props.todo.checked}
        priority={props.todo.priority}
      />
      <div className="flex flex-col h-full w-full justify-center">
        <div className={`text-sm ${props.todo.checked && "line-through"}`}>
          {props.todo.name}
        </div>
        <div className="flex flex-row w-full justify-between">
          <Date dateStart={props.todo.dateStart} dateEnd={props.todo.dateEnd} />
          <Tags tags={props.todo.tags} />
        </div>
      </div>
    </div>
  );
}

export default Todo;
