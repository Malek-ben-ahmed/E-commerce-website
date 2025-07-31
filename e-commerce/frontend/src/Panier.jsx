import { useParams,Link,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './Panier.css'
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from 'react'
import basketshop from './assets/panier.png'

function Panier(){
    
const[showselect,setshowselect]=useState(false)
const [showproduct,setshowproduct]=useState(false)
const [data,setdata]=useState([]);
const[achercher,setachercher]=useState("")
const[rechercher,setrechercher]=useState("")
const[showvide,setshowvide]=useState(true)
const {id,quantite}=useParams()
const navigate=useNavigate()
console.log({id})
console.log(quantite)
useEffect(()=>{
if(quantite>0){
    setshowproduct(true);
    setshowvide(false);
    
}},[quantite]);
useEffect(()=>{
const fetchdata=async ()=>{
   try{
    const res=await fetch('http://localhost:5000/products');
    const dataa=await res.json();
    setdata(dataa);
    }catch(error){console.log(error)}
    };
    fetchdata();
  },[]);
 console.log("Data", data);
const pr = data.find(el => el.id === id);
console.log(pr);

const handlesearchbutton = () => {
     const searchLower = achercher.toLowerCase();
    const found = data.find(prod => {
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
        { showvide &&
        <div className="boxvide">
            <img className="basketshop" src={basketshop} alt="basketshop" width={100} height={100}/>
            <p style={{fontWeight:"bold"}}>Votre panier est vide!<br/>Parcourez nos catégories et découvrez nos meilleures offres!</p>
            <Link to="/"><button type="button" id="tohomepage">Commencer vos achats</button></Link>
        </div>}
        {showproduct &&
        <div className="achats" style={{width:700}}>
        <div className="imgdelbutton">
        <img src={pr?.image} alt={pr?.name} width={150} height={150}/>
        <button type="button" onClick={()=>{setshowproduct(false),setshowvide(true)}}><FontAwesomeIcon icon={faTrash}/>Supprimer</button>
        </div>
        <div className="info">
        <h4>{pr?.name}</h4>
        <p>Description:</p>
        <p>{pr?.description}</p>
        <p id="price">{pr?.price} dt</p>
        
        </div>
        </div>
        }
        </>
    )
}
export default Panier;