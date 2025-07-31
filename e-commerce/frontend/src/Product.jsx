
import './Product.css'
import { useParams ,useNavigate} from 'react-router-dom';
import {useState,useEffect} from 'react'
import camionnette from "./assets/decamionnettelivraison.webp"
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Product(){
const[showselect,setshowselect]=useState(false);
const [data,setdata]=useState([]);
const[achercher,setachercher]=useState("")
const[rechercher,setrechercher]=useState("")
const [quantité,setquantité]= useState(0)
const {id}=useParams();
const navigate=useNavigate()
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
                    <Link to={`/Panier/${id}/${quantité}`}>
                    <FontAwesomeIcon icon={faShoppingCart} id="iconforshop"/><span>{quantité}</span>
                    </Link>
                    </div>
             
                </div>



        <div className='seulproduct'>
            <img src={pr?.image} alt={pr?.name} width='400px' height='400px'/>
            <div className="product-card" style={{width:450,height:400}}>
             <h4>{pr?.name}</h4>
             <p className="price">{pr?.price}dt</p>
             <p>Description du produit:</p>
             <p>{pr?.description}</p>
             <p>Quantité :</p>
            <div className="quantity-buttons">
                 <button onClick={()=>setquantité(quantité-1)}>-</button>
                 <button>{quantité}</button>
                 <button onClick={()=>setquantité(quantité+1)}>+</button>
            </div>
            <button id="addproduct" onClick={()=>{setquantité(quantité+1);return alert("produit ajouter avec succée")}}>Ajouter au panier</button>
            </div>
            
        </div>
        
              
        </>
    )
}
export default Product