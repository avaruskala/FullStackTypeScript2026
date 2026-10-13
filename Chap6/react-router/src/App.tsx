import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { HomeA } from './HomeA'
import { HomeB } from './HomeB'
import { HomeC } from './HomeC'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<div>Home</div>} />
          <Route path='/a' element={<HomeA />} >
            <Route path='c/:id?' element={<HomeC />} />
          </Route>
          <Route path='/b' element={<HomeB />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
