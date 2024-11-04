'use client';

import { useState, useEffect, useContext } from 'react';
import TodoCreator from '../../components/TodoCreator/index';
import LeftContainer from '../../components/LeftContainer';
import MidContainer from '../../components/MidContainer';
import RightContainer from '../../components/RightContainer';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { firestore } from '../../lib/firebase';
import { useAuth } from '../hooks/AuthContext';
import {doc, getDoc} from 'firebase/firestore';

const initTodo = {
  name: '',
  priority: 'low',
  dateStart: '',
  dateEnd: '',
  tags: [],
  checked: false
};

const initTodoList = () => (
  {
    _id: nanoid(),
    name: 'New List',
    data: [],
    sort: null,
    filter: null,
  }
);

function App() {
  const [creatorState, setCreatorState] = useState('hidden');
  const [todoLists, setTodoLists] = useState([initTodoList()]);
  const [activeListId, setActiveListId] = useState(todoLists[0]._id);
  const [displayedTodo, setDisplayedTodo] = useState(initTodo);
  const [username, setUsername] = useState("");
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  if (!currentUser) {
    router.push('/login');
  }


  useEffect(() => { 
    const usefetch = (async () => {
      const userId = currentUser.uid;
      const username = currentUser.displayName;
      const userDocRef = doc(firestore, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      console.log('data fetched');

      setTodoLists(userData.TodoLists);
      setActiveListId(userData.TodoLists[0]._id);
      setUsername(username);
    });

    const logOutifNoToken = async () => { 
      if (!Cookies.get('token')) {
        await logout();
      }
    }

    logOutifNoToken();
    usefetch();
  }, []);

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setCreatorState('hidden');
      setDisplayedTodo(initTodo);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, [creatorState]);

  const todoCreatorProps = {
    todoLists,
    setTodoLists,
    activeListId,
    currentUser,
    creatorState,
    setCreatorState,
    displayedTodo,
    setDisplayedTodo,
  };

  const leftContainerProps = {
    todoLists,
    username,
    currentUser,
    setTodoLists,
    activeListId,
    setActiveListId,
  };

  const midContainerProps = {
    todoLists,
    setTodoLists,
    creatorState,
    currentUser,
    setCreatorState,
    setDisplayedTodo,
    activeListId
  };

  const rightContainerProps = {
    todoLists,
    setTodoLists,
    currentUser,
    activeListId,
  };

  return (
    <div className="font-sans w-screen min-h-screen h-full bg-neutral-900">
      {creatorState!=='hidden' && <TodoCreator {...todoCreatorProps} />}
      <LeftContainer {...leftContainerProps} />
      <MidContainer {...midContainerProps} />
      <RightContainer {...rightContainerProps} />
    </div>
  );
}

export default App;
