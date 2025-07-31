import './Signup.css'
import { useState } from 'react'
import { auth, db } from './Firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from "firebase/firestore";

function Signup(){
const [fullname,setfullname]=useState("")
const [email,setemail]=useState("")
const [phonenum,setphonenum]=useState("")
const [password,setpassword]=useState("")
const [confpassword,setconfpassword]=useState("")
const navigate=useNavigate();
const handlesignup=(e)=>{
    e.preventDefault();
    if(fullname===""){
        alert("le champs nom et prénom est vide")
         return;
    }
    else if(email===""){
        alert("le champs email est vide ")
         return;
    }
    else if(phonenum===""){
        alert("le champs du numéro de téléphone est vide")
        return;
    }
    else if(password===""){
        alert("le champs de mot de passe est vide")
        return;
    }
    else if(phonenum.length !== 8){
    alert("Le numéro du téléphone ne doit pas passer 8 chiffres!")
    return;
    }
    else if(password !==confpassword){
        alert("vérifier votre password!")
        return;
    }
    else{
    const signupUser=async () => {
    try {
      // Étape 1 : Créer l'utilisateur
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Étape 2 : Enregistrer les infos supplémentaires dans Firestore
      await setDoc(doc(db, "Users", user.uid), {
        "email": email,
        "fullname": fullname,
        "phonenumber": phonenum,  
        
      });

     alert("Compte créé avec succès !");
     navigate("/Bodycontent")
    } catch (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      alert(error.message);
    }
}

signupUser();  
    }
}
    return(
        <>
        <h4>Créer un compte</h4>
        <div className='formu'>
        <form onSubmit={handlesignup}>
            <label htmlFor="fullname"style={{marginLeft:-120}}>Nom et Prénom</label><br/>
            <input type="text" name="fullname" id="fullname" onChange={(e)=>setfullname( e.target.value)}/><br/>
            <label htmlFor="email" style={{marginLeft:-200}}>Email</label><br/>
            <input type="email" name="email" id="email" onChange={(e)=>setemail(e.target.value)}/><br/>
            <label htmlFor="phonenumber" style={{marginLeft:-100}}>Numéro du téléphone</label><br/>
            <input type="text" name="phonenumber" id="phonenumber" onChange={(e)=>setphonenum( e.target.value)}/><br/>
            <label htmlFor="passwor"style={{marginLeft:-155}}>mot de passe</label><br/>
            <input type="password" name="password" id="password" onChange={(e)=>setpassword(e.target.value)}/><br/>
            <label htmlFor="confirmpassword" style={{marginLeft:-65}}>Confirmer le mot de passe</label><br/>
            <input type="password" name="confirmpassword" id="confirmpassword" onChange={(e)=>setconfpassword( e.target.value)}/><br/>
            
           
          <button type="submit" id="boutton">Crée un Compte</button>
        </form>
        </div>

        </>
    )
}
export default Signup