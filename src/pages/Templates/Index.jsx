import React from 'react'
import HeroSection from './HeroSection';
import './template.css';
import TemplateSignup from './TemplateSignup';
import SidebarOfTemplateCatagories from './listOfTemplates/SidebarOfTemplateCatagories';
const Index = () => {
  return (<>
  
      <HeroSection/> 
      <div className="container">
        <TemplateSignup/>
<SidebarOfTemplateCatagories/>

      </div>

  </>


 )
}

export default Index