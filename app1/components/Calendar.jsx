import { nanoid } from "nanoid";
import { useState } from "react";

function Calendar(props) {
  const [date, setDate] = useState(props.date);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const titles = ["S", "M", "T", "W", "T", "F", "S"];

  let y = date.getFullYear(), m = date.getMonth();
  let start = new Date(y, m, 1).getDay();
  let end = new Date(y, m + 1, 0).getDate();

  let days = [];
  for(let i = 0; i < 6; i++) {
    days[i] = [];
    for(let j = 0; j < 7; j++) {
      const date = 7*i + j-start + 1;
      days[i][j] = (date>=1 && date<=end) ? date : 0;
    }
  }

  function handleClickLeft() {
    const d = new Date(date)
    if (d.getMonth() == 0) {
      d.setFullYear(d.getFullYear()-1);
      d.setMonth(11);
    } else {
      d.setMonth(d.getMonth()-1);
    }
    setDate(d);
  }

  function handleClickRight() {
    const d = new Date(date)
    if (d.getMonth() == 11) {
      d.setFullYear(d.getFullYear()+1);
      d.setMonth(0);
    } else {
      d.setMonth(d.getMonth()+1);
    }
    setDate(d);
  }

  const activeList = props.todoLists.filter(todoList => (
    todoList._id === props.activeListId
  ))[0];

  const content = (
    <div className="rounded-md">
      <div className=" text-white flex justify-around items-center mb-2">
        <button
          className="hover:scale-125 h-min transition"
          onClick={handleClickLeft}
        >
          ◀
        </button>
        <div className="text-center text-lg font-semibold">
          <div>{y}</div>
          <div>{months[m]}</div>
        </div>
        <button
          className="hover:scale-125 h-min transition"
          onClick={handleClickRight}
        >
          ▶
        </button>
      </div>
      <div className="text-white h-max py-3 rounded-md">
        <div>
          {titles.map(title => (
            <span
              key={nanoid()}
              className="w-10 h-10 inline-block rounded-full font-semibold text-center"
            >
              {title}
            </span>
          ))}
        </div>
        {days.map(day => (
          <div key={nanoid()}>
            {day.map(d => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              let buttonColor;
              if (activeList && new Date(activeList.filter).getTime() === new Date(date.getFullYear(), date.getMonth(), d).getTime()) {
                buttonColor = "bg-yellow text-black"
              } else {
                buttonColor = "bg-neutral-800";
              }

              return (
                d === 0 ? 
                  <button
                    className="w-10 h-10 pointer-events-none"
                    key={nanoid()} />
                  :
                  <button
                    className={`transition m-1 w-8 h-8 inline-block rounded-full text-center ${buttonColor}`}
                    onClick={() => {
                      const newTodoLists = props.todoLists.map(todoList => {
                        if (todoList._id === props.activeListId) {
                          return {...todoList, filter:
                            new Date(date.getFullYear(), date.getMonth(), d)};
                        }
                        return todoList;
                      })
                      props.setTodoLists(newTodoLists);
                    }}
                    key={nanoid()}
                  >
                    {d}
                  </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className={`flex flex-col p-3 rounded-md`}>
        {content}
      </div>
    </>
  );
}

export default Calendar;
