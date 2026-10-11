import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import './App.css'
import Home, { type UserType } from './Home'
import Awaitable from './Awaitable';
import DeferredValue from './DeferredValue';
import Transitioner from './Transitioner';
import UserForm from './UserForm';
import { OptimisticMessage } from './OptimisticMessages';



async function fetchData(url: string) {
  const response = await fetch(url);
  const users = await response.json();
  return (Array.isArray(users) ? users : [users]) as UserType[];

}

function App() {
  return (
    <>
      <OptimisticMessage />
    </>
  )
}

export default App
