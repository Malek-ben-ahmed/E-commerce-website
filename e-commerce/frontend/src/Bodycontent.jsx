import './Bodycontent.css'
import {Link ,useNavigate} from 'react-router-dom'
import camionnette from "./assets/decamionnettelivraison.webp"
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useEffect } from 'react';
import iconchat from './assets/messages-mac.png'

function Bodycontent(){
const[showselect,setshowselect]=useState(false);
const[achercher,setachercher]=useState("")
const[response,setresponse]=useState("")
const [userchat,setuserchat]=useState("")
const [showresponse,setshowresponse]=useState(false)
const[alldata,setalldata]=useState([]);
const [showiconchat,setshowiconchat]=useState(true)
const [showmessages,setshowmessages]=useState(false)
const [usermessage,setusermessage]=useState("")
const navigate=useNavigate();
const handlechatbot=async ()=>{
 try{
  const res=await fetch("http://127.0.0.1:5000/predict",{
    method:'post',
    headers:{
      "Content-Type": "application/json",
    },
    body:JSON.stringify({ message: usermessage }),
 });
   const data=await res.json();
   console.log(data)
   setresponse(data.response.answer);
   setuserchat(usermessage)
   setusermessage("");
   setshowresponse(true)
   

 }catch(error){console.log(error.message)}

}
useEffect(()=>{
const getdata=async ()=>{
    try{
const res=await fetch('http://localhost:5000/products');
const data= await res.json()
setalldata(data);
console.log(alldata);

} catch(error){console.log(error)}
};
getdata();
},[]);
console.log(alldata)



  const handlesearchbutton = () => {
     const searchLower = achercher.toLowerCase();
    const found = alldata.find(prod => {
     return (
      prod.name.toLowerCase().includes(searchLower) ||
      prod.category.toLowerCase().includes(searchLower)
    );
    }
    );

    if (found) {
      switch (found.category.toLowerCase()) {
        case 'montre':
          navigate('/Montres');
          break;
        case 'bracelet':
          navigate('/Bracelets');
          break;
        case 'collier':
          navigate('/Colliers');
          break;
        case "boucles d'oreilles":
          navigate('/Bouclesoreilles');
          break;
        default:
          return alert('Catégorie non reconnue');
          
      }
    } else {
      return alert('Produit non trouvé');
      
    }
  };

return(

    <>
    
            <div className="header">
            <h2>Livraison à domicile </h2>
            <img src={camionnette} alt="liv" width={150}/>
            </div>
            <div className="navbar">
                <div className="search">
                <select id="categories" onChange={(e)=>navigate(e.target.value)}>
                    <option><p>Catégories</p></option>
                    <option value="/Montres">Montres</option>
                    <option value="/Bracelets">Bracelets</option>
                    <option value="/Colliers">Colliers</option>
                    <option value="/Bouclesoreilles">Boucles d'oreilles</option>
                </select>
                <input type="search" id="barrerecherche" onChange={(e)=>setachercher(e.target.value)}/>
                <button id="Rechercher" onClick={handlesearchbutton}>Rechercher</button>
                </div>
                <div className="elements">
                <Link to="/Login"><button id="Seconnecter">Se Connecter</button></Link>
                <FontAwesomeIcon icon={faUser} id="iconforuser" onClick={()=>setshowselect(!showselect)
                }/>
                    {showselect &&
                    <div id="options">
                    <Link to="/Signup" style={{textDecoration:'none',fontWeight: '500',color:'black'}}>Sign up</Link>
                    <Link to="" style={{textDecoration:'none',fontWeight: '500',color:'black'}}>Méthodes de paiement</Link>
                    </div>
                 }
    
                <FontAwesomeIcon icon={faShoppingCart} id="iconforshop"/>
                </div>
         
            </div>
            <div className='elements'>
            {alldata.map(element=>{
             return(
            <Link to={`/Product/${element.id}`} key={element.id} style={{textDecoration:"none"}} >
            <div className="product-card">
                <img id="product-image" src={element.image} alt={element.name} />
                <h4 id="product-name" >{element.name}</h4>
                <p id="product-price" >{element.price} dt</p>
            </div>
            </Link>
             )  
        })
        }
        </div>
        {showiconchat &&
        <img id="iconforchat" src={iconchat} alt="chat" width={70} onClick={()=>{setshowiconchat(false),setshowmessages(true)}}/>
        }
        {
          showmessages &&
          <div className='boxforchat'>
            <h4>Discutez avec nous</h4>
            <p>👋 Bonjour, écrivez‑nous <br/>
            si vous avez des questions.<br/>
             Nous serons ravis de vous aider !</p>
             { showresponse &&
             <div className="chat-container">
             <div id="usermessage">{userchat}</div><br/>
            <div id="chatmessage">{response}</div><br/>
            </div>
            }
            <textarea  id="userchat" placeholder='Ecrire un message.' value={usermessage} onChange={(e)=>setusermessage(e.target.value)}/>
            <button type='submit' id="sendbutton"  onClick={handlechatbot}><FontAwesomeIcon icon={faPaperPlane} style={{marginBottom:20,color:"rgb(83, 82, 82)"}}/></button>
          </div>
        }
    
    </>
)
}
export default Bodycontent 