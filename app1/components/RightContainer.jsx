import Calendar from "./Calendar";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/hooks/AuthContext";
function RightContainer(props) {
  const router = useRouter();
  const {logout } = useAuth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
    <div
      className="hidden xl:block fixed right-0 top-0 w-80 h-full bg-neutral-800"
    >
      <Calendar
        date={today}
        todoLists={props.todoLists}
        setTodoLists={props.setTodoLists}
        activeListId={props.activeListId}
      />
      <div className="w-full flex justify-around">
        <button 
          className="text-white bg-neutral-700 hover:bg-neutral-600 transition rounded-md p-1"
          onClick={() => {
            const newTodoLists = props.todoLists.map(todoList => {
              if (todoList._id == props.activeListId) {
                return {...todoList, filter: null};
              }
              return todoList;
            })
            props.setTodoLists(newTodoLists)
          }}
        >
          Clear Filter
        </button>
      </div>
      <div>
        <button
         
          className="text-black bg-amber-200 hover:brightness-75 rounded-md py-2 px-3 transition-all absolute bottom-11"
          style={{right: '110px'}}
          onClick={async () => {
            await logout();
            router.push("/login");
          }} 
        >
          Log Out
        </button>
      </div>
    </div>
    
    </>
  );
}

export default RightContainer;
