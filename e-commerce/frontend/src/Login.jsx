import React from 'react'
import {Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Signup.css'
import {signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
function Login() {
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const navigate=useNavigate()
    const handlelogin=(e)=>{
       e.preventDefault();
       console.log(email);
       console.log(password)
        if(email==="" && password===""){
             alert("veuillez remplir tous les champs pour se connecter")
            return;
            
        }
        else if(email===""){
         alert("le champs email est vide")
        return;
        }
        else if(password===""){
            alert("le champs de mot de passe est vide")
            return;
        }
        else{
         const adduser=async()=>{try {
         await signInWithEmailAndPassword(auth, email, password);
         alert("Connexion réussie !");
         navigate("/Home"); 
        } catch (error) {
        if (error.code === 'auth/user-not-found') {
        alert("Utilisateur non trouvé");
      } else if (error.code === 'auth/wrong-password') {
        alert("Mot de passe incorrect");
      } else {
        alert(error.message);
      }
    }}
    adduser()
  }
  } 
       
    
  
  return (
    <>
       <h4>Se Connecter</h4>
        <div className='formu'>
        <form onSubmit={handlelogin}>
            <label htmlFor="email" style={{marginLeft:-200}}>Email</label><br/>
            <input type="email" name="email" id="email" onChange={(e)=>setemail(e.target.value)}/><br/>
            <label htmlFor="passwor"style={{marginLeft:-155}}>mot de passe</label><br/>
            <input type="password" name="password" id="password" onChange={(e)=>setpassword(e.target.value)}/><br/>
            <Link to="/Pwd" style={{textDecoration:'none'}} id="linkpwdforgotten">Mot de passe oublié?</Link><br/>
           
          <button type="submit" id="boutton">Se Connecter</button>
        </form>
        </div>
    </>
  )
}

export default Login






