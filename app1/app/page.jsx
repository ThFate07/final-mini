"use client";

import Link from "next/link";
import { useState } from "react";

function Home() {
  const [activeTab, setActiveTab] = useState("todolist");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-amber-50">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold font-sans text-center pt-16 mb-2">
        Personal productivity hub
      </h1>
      <div className="text-lg lg:text-xl font-semibold font-sans text-center mb-10 px-10">
        A fast and flexible web-based app.
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "todolist"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick("todolist")}
        >
          To-Do List
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === "financemanagement"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => handleTabClick("financemanagement")}
        >
          Finance Management
        </button>
      </div>

      <div className="flex justify-center gap-3 items-center mb-14">
        <Link
          href="/app"
          className="px-6 py-4 w-max text-xl font-semibold text-center border-black border-solid border-2 bg-yellow hover:brightness-90 transition rounded-xl"
        >
          Todo-List
        </Link>
        <a
          href="http://localhost:3001/"
          className="px-6 py-4 w-max text-xl font-semibold text-center bg-white border-black border-2 border-solid hover:brightness-90 transition rounded-xl"
        >
          Financial Management
        </a>
      </div>
      <div>
        {activeTab === "todolist" ? (
          <img
            className="w-8/12 mx-auto rounded-xl mb-14 drop-shadow-md"
            alt="screenshot of Personal productivity hub web-based todo app"
            src="/assets/app.png"
          />
        ) : (
          <img
            className="w-8/12 mx-auto rounded-xl mb-14 drop-shadow-md"
            alt="screenshot of Personal productivity hub web-based todo app"
            src="/assets/main_menu.png"
          ></img>
        )}
      </div>

      {activeTab === "todolist" ? (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
          <img
            src="/assets/todo.png"
            alt="screenshot of Personal productivity hub's todo creator"
            className="max-w-md w-2/3 rounded-lg drop-shadow-md"
          />
          <div>
            <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">
              Todo Properties
            </h2>
            <p className="max-w-sm lg:w-96">
              Create todo with 4 properties: Name, Date, Priority and Tag. Press
              Enter to add it to list. Click the circle to mark it as done.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
          <img
            src="/assets/income_tracker.png"
            alt="screenshot of Personal productivity hub's todo creator"
            className="max-w-screen-md rounded-lg drop-shadow-md"
          />
          <div>
            <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">
              Income Tracker
            </h2>
            <p className="max-w-sm lg:w-96 ">
              Track your income <b>effortlessly</b>! <br></br>Enter the amount,
              type, date, and taxable status <br></br>then click "Add income" to
              record. <br></br>View your total income instantly, and clear
              entries anytime with "Delete all."
            </p>
          </div>
        </div>
      )}

      {activeTab === "todolist" ? (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
          <div>
            <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">
              Multiple Lists
            </h2>
            <p className="max-w-sm lg:w-96">
              Create multiple lists for different purposes: daily todo list,
              long-term goal list or even project feature list.
            </p>
          </div>
          <img
            src="/assets/list.png"
            alt="screenshot of Personal productivity hub's multiple list feature"
            className="max-w-[13em] w-2/3 rounded-lg order-first lg:order-last drop-shadow-md"
          />
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
          <div>
            <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">
              Expense Tracker
            </h2>
            <p className="max-w-sm lg:w-96">
              Easily log your expenses by entering the amount, description,
              category, type, and date. <br></br>Track your total expenses
              within a selected date range to get a clear view of your spending.{" "}
              <br></br>Click "Add expense" to record, and view your total
              instantly. Manage your finances with ease and stay on top of your
              budget!
            </p>
          </div>
          <img
            src="/assets/expense tracker.png"
            alt="screenshot of Personal productivity hub's multiple list feature"
            className="max-w-md w-2/3 rounded-lg order-first lg:order-last drop-shadow-md"
          />
        </div>
      )}

      {activeTab === "todolist" ? (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
          <img
            src="/assets/calendar.png"
            alt="screenshot of Personal productivity hub's calendar view feature"
            className="max-w-[17em] w-2/3 rounded-lg drop-shadow-md"
          />
          <div>
            <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">
              Calendar View
            </h2>
            <p className="max-w-sm lg:w-96">
              View your todos with calendar. The date with todos is highlighted.
              Click on each date to only show the todos on that day.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
          <img
            src="/assets/Tax Calculator.png"
            alt="screenshot of Personal productivity hub's calendar view feature"
            className="max-w-[17em] w-2/3 rounded-lg drop-shadow-md"
          />
          <div>
            <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">
              Tax Calculator
            </h2>
            <p className="max-w-sm lg:w-96">
              Calculate your taxes with ease! Select your filing status, choose
              whether to apply the standard deduction, and enter any additional
              deductions. Click "Calculate" to view your estimated state,
              federal, and FICA tax amounts, along with your income before taxes
              and the amount you need to pay. Simplify your tax planning and
              stay informed on your obligations!
            </p>
          </div>
        </div>
      )}

      { activeTab== "todolist" ? <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:space-x-10 mb-20 ml-5">
        <div>
          <h2 className="w-max text-2xl font-bold mt-4 lg:mt-0 mb-2">Sorter</h2>
          <p className="max-w-sm lg:w-96">
            Sort your todos with the 4 properties. You can also use it under
            calendar view.
          </p>
        </div>
        <img
          src="/assets/sort.png"
          alt="screenshot of Personal productivity hub's sorter feature"
          className="max-w-[8em] w-2/3 rounded-lg order-first lg:order-last drop-shadow-md"
        />
      </div>
      : null
}

      <p className="text-3xl font-bold text-center mt-20 mx-10 pb-1 mb-10">
        You can access all these features after creating an account!
      </p>

      <div className="flex flex-col items-center mb-16">
        <Link
          href="/app"
          className="px-6 py-4 w-max text-xl font-semibold text-center bg-yellow hover:brightness-90 transition rounded-xl"
        >
          Get Started
        </Link>
      </div>

      <footer className="py-8 bg-[#252525] text-white">
        <div className="text-center">Made by Kunaal,Steve,Shivam,Ken</div>
      </footer>
    </div>
  );
}

export default Home;
