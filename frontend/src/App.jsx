import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Layout} from './Pages/Layout'
import {Users} from './Pages/Users'
import {Login} from './Pages/Login'
import {Menu} from './Pages/Menu'
import {Ingresosmant} from './Pages/Ingresosmant'
import {Egresos} from './Pages/Egresos'
import "./App.css"

function App() {
 
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/Login" element={<Login />} />
          <Route index path="/Menu" element={<Menu />} />
          <Route index path="/Ingresosmant" element={<Ingresosmant />} />
          <Route index path="/Egresos" element={<Egresos />} />
          <Route path="/" element={<Layout />}>
            <Route index path="/Users" element={<Users />} />
           
            
          </Route>
          
          <Route path="*" 
              element={<>
                <h2>No encontramos la pagina</h2>
              </>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
