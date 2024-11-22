import PropTypes from "prop-types";
import "./Header.css";
import Logo from '../../assets/svgs/logofinal.svg?react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ className = "" }) => {
const [togglesidebar, settogglesidebar] = useState(false)
const [highlighter, sethighlighter] = useState()
const [sidbarHighlighter, setsidbarHighlighter] = useState()

const navigate = useNavigate()
const toggle =()=>{
  settogglesidebar(!togglesidebar)
}

const highlighterHandler=(id)=>{
  sethighlighter(id)
}
const sidbarHighligherHandler=(id)=>{
  setsidbarHighlighter(id)
}
  return (<>
     <section className={`header ${className}`}>
      <header className="top-nav-container">
        
        <div className="pt-2 ">
        <Link to={'/'} className={`main-item ${highlighter==='07'? 'item-highlighted':''}`} id="07" onClick={()=>highlighterHandler('07')}>  <Logo width={120}/>  </Link>
          
        
        </div>

        <nav className="navigation">
          <nav className="product-links-container ">
            <Link to={'/products'} className={`main-item ${highlighter==='01'? 'item-highlighted':''}`} id="01" onClick={()=>highlighterHandler('01')}>Products</Link>
            <Link to={'/templates'} className={`main-item ${highlighter==='02'? 'item-highlighted':''}`} id="02"onClick={()=>highlighterHandler('02')}>Templates</Link>
             <Link to={'/enterprise'} className={`main-item ${highlighter==='04'? 'item-highlighted':''}`} id="04"onClick={()=>highlighterHandler('04')}>Enterprise</Link>
            <Link to={'/resources'} className={`main-item ${highlighter==='05'? 'item-highlighted':''}`} id="05"onClick={()=>highlighterHandler('05')}>Resources</Link>
            <Link to={'/guidance'} className={`main-item ${highlighter==='06'? 'item-highlighted':''}`} id="06"onClick={()=>highlighterHandler('06')}>
            <div className="how-to-use ms-4">
            <button type="button"   className={`btn ${highlighter==='06'? 'btn-outline-secondary':''}`} onClick={()=>navigate('/guidance')}>How to use</button>
            {/* <div className="guidance" ></div> */}

</div>
</Link>

          </nav>
        </nav>
      
        <div className="user-actions-container">
          <div className="auth-links-container">
            <div className="user-options">
              <Link to={'/contact'} id="07" className={`main-item ${highlighter==='07'? 'item-highlighted':''}`} onClick={()=>highlighterHandler('07')}>Contact Sales</Link>
            </div>
            <div className="user-options1">
              <Link to={'/login'} id="08" className={`main-item ${highlighter==='08'? 'item-highlighted':''}`} 
              onClick={()=>{
                highlighterHandler('08')
                }}>
                Login
                </Link>
            </div>
            <div className="signup-button-container">
              <div className="signup" onClick={()=>navigate('/signup')}>Signup</div>
            </div>
          </div>
        </div>

      {/* sidbar icon */}
      <div className="sidbar-icon-container">
        <MenuIcon onClick={toggle}/>
      </div>
      </header>

{/* sidbar menu */}
<div className={`sidbar-menu-container ${togglesidebar ? 'active-sidbar':''}`}>
<div className="close-icon">
  <CloseIcon 
  onClick= {toggle}
  style={{fontSize:'37px', color:'#f5f5f5'}}/>
</div>
<div className="sidbar-menu-item-list">
  <ul className="sidbar-item-list">   
     <li className={`sidbar-item ${sidbarHighlighter==='01'? 'sidbar-highlighted':''}`}
     onClick= {()=>{
      toggle()
      sidbarHighligherHandler('01')
    }}
     >
      <Link to={'/products'}>Products</Link>
      
      </li>
    <li className={`sidbar-item ${sidbarHighlighter==='02'? 'sidbar-highlighted':''}`}
    onClick= {()=>{
      toggle()
      sidbarHighligherHandler('02')
    }}
     >
       <Link to={'/templates'}>Templates</Link>
      
      </li>

    {/* <li className={`sidbar-item ${sidbarHighlighter==='03'? 'sidbar-highlighted':''}`} 
   onClick= {()=>{
      toggle()
      sidbarHighligherHandler('03')
    }}
    >
       <Link to={'#'}>Pricing</Link>
      
      </li> */}
    <li className={`sidbar-item ${sidbarHighlighter==='04'? 'sidbar-highlighted':''}`} 
   onClick= {()=>{
      toggle()
      sidbarHighligherHandler('04')
    }}
    >
       <Link to={'/enterprise'}> Enterprise</Link>
     
      </li>
    <li className={`sidbar-item ${sidbarHighlighter==='05'? 'sidbar-highlighted':''}`} 
   onClick= {()=>{
      toggle()
      sidbarHighligherHandler('05')
    }}
    >
       <Link to={'/resources'}> Resources</Link>
     
      </li>
    <li className={`sidbar-item ${sidbarHighlighter==='06'? 'sidbar-highlighted':''}`}  
   onClick= {()=>{
      toggle()
      sidbarHighligherHandler('06')
    }}
    >
     
      <Link to={'/contact'}>Contact Sales</Link>
      </li>
    <li className={`sidbar-item ${sidbarHighlighter==='07'? 'sidbar-highlighted':''}`} 
   onClick= {()=>{
      toggle()
      sidbarHighligherHandler('07')
    }}
    >
       <Link to={'/login'}>Login</Link>
      
      </li>
    <li className={`sidbar-item ${sidbarHighlighter==='08'? 'sidbar-highlighted':''}`} 
   onClick= {()=>{
      toggle()
      sidbarHighligherHandler('08')
    }}
    >
       <Link to={'/signup'}> Signup</Link>
     
      </li>
  </ul>
</div>
</div>
    </section>
  </>
   
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
