
import './App.css'
import Bodycontent from './Bodycontent'
import Navbar from './Navbar'
import Panier from './Panier'
import Product from './Product'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Signup'
import Login from './login'
import Pwd from './Pwd'
import Montres from './Montres'
import Bracelets from './Bracelets'
import Bouclesoreilles from './Bouclesoreilles'
import Colliers from './Colliers'

function App() {
  
  return (
    <>
    
     <BrowserRouter>
      <Routes>
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Bouclesoreilles" element={<Bouclesoreilles/>}/>
        <Route path="/Colliers" element={<Colliers/>}/>
        <Route path="/Bracelets" element={<Bracelets/>}/>
        <Route path="/Montres" element={<Montres/>}/>
        <Route path="/Pwd" element={<Pwd/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        <Route path="/" element={<Bodycontent />} />
        <Route path="/Product/:id" element={<Product />} />
        <Route path="/Panier/:id/:quantite" element={<Panier />} />
      </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App
