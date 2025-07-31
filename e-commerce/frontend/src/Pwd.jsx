import React, { useState } from 'react'
import './Signup.css'
import {Link} from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function Pwd() {
const [email,setemail]=useState("")
const handlepwd=(e)=>{
  e.preventDefault()
    if(email===""){
        alert("veuillez tappez votre email pour suivre les étapes de réinitialisation de votre mot de passe")
        return;
    }
    else{
       const auth = getAuth();
      sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Email de réinitialisation envoyé !");
    })
    .catch((error) => {
      console.error(error);
      alert("Erreur lors de l'envoi de l'email : " + error.message);
    });
    }
}

  return (
    <>
     <div className='formu'>
     <form onSubmit={handlepwd}>
     <p style={{fontWeight:500}}>Merci de tapper votre adresse email.<br/>Vous recevrez un e-mail contenant<br/> les instructions vous permettant<br/>de réinitialiser votre mot de passe.</p><br/>
     <input type="email" placeholder='Adresse email' name="email" id="email" onChange={(e)=>setemail(e.target.value)}/><br/>
     <button type="submit" id="boutton">lien de réinitialisation</button><br/><br/>
     <Link to="/Login" style={{textDecoration:'none'}} id="lienderetour" >Retour à la page de connexion</Link>
     </form>
     </div>
    </>
  )
}

export default Pwd
