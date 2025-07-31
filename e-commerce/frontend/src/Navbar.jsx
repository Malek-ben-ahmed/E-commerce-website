import camionnette from "./assets/decamionnettelivraison.webp"
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
function Navbar(){
    const[showselect,setshowselect]=useState(false)
    return(
        <>
        <div className="header">
        <h2>Livraison à domicile </h2>
        <img src={camionnette} alt="liv" width={150}/>
        </div>
        <div className="navbar">
            <div className="search">
            <select id="categories">
                <option><p>Catégories</p></option>
                <option value="Montres">Montres</option>
                <option value="Bracelets">Bracelets</option>
            </select>
            <input type="search" id="barrerecherche" />
            <button id="Rechercher">Rechercher</button>
            </div>
            <div className="elements">
            <button id="Seconnecter">Se Connecter</button>
            <FontAwesomeIcon icon={faUser} id="iconforuser" onClick={()=>setshowselect(!showselect)
            }/>
                {showselect &&
                <div id="options">
                <a href="" style={{textDecoration:'none',fontWeight: '500',color:'black'}}>Sign up</a>
                <a href=""style={{textDecoration:'none',fontWeight: '500',color:'black'}}>Méthodes de paiement</a>
                </div>
             }

            <FontAwesomeIcon icon={faShoppingCart} id="iconforshop"/>
            </div>
     
        </div>
        </>
     );
}
export default Navbar;