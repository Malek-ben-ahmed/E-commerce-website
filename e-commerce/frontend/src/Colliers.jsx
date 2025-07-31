import './Bodycontent.css'
import {Link,useNavigate} from 'react-router-dom'
import camionnette from "./assets/decamionnettelivraison.webp"
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useEffect } from 'react';

function Colliers(){
const[showselect,setshowselect]=useState(false);
const[alldata,setalldata]=useState([]);
const[achercher,setachercher]=useState("")
const[rechercher,setrechercher]=useState("")
const navigate=useNavigate();
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
            {alldata.map(element=>{if(element.category==="collier")
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
    
    </>
)
}
export default Colliers