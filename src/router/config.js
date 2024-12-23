

import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import PublicLayout from '../components/plugins/PublicLayout';
import LoginLayout from '../components/plugins/LoginLayout';
import DashboardLayout from '../components/plugins/DashboardLayout.jsx';

const LandingPage =lazy(()=>import("../pages/landingPage"))
const LoginScreen =lazy(()=>import("../pages/Login/LoginScreen"))
const SignupScreen =lazy(()=>import("../pages/signup/Signup"))
const Q12report =lazy(()=>import("../pages/Dashboard/q12SruveyReportsScreen"))
const StartSurvey =lazy(()=>import("../pages/Dashboard/startSurveyScreens/ListOfLaunchedServey.jsx"))
const ForgotPassword =lazy(()=>import("../pages/ForgotPassword/ForgotPassword.jsx"))
const ResetPassword =lazy(()=>import("../pages/ResetPassword/ResetPassword.jsx"))
const Productsscreen=lazy(()=>import("../pages/Products/Products.jsx"))
const ContactUs =lazy(()=>import("../pages/contactUs/ContactUs.jsx"))
const Templates =lazy(()=>import("../pages/Templates/Index.jsx"))
const ResourcesScreen =lazy(()=>import("../pages/Resources/index.jsx"))
const AccountVerified =lazy(()=>import("../pages/accountVerified/AccountVerified.jsx"))
const Enterpirse = lazy(()=>import("../pages/Enterprise/Enterpirse.jsx"))
const Profile = lazy(()=>import("../pages/Dashboard/Profile/Profile.jsx"))
const Signout =lazy (()=>import("../pages/Dashboard/signout/Signout.jsx"))
const Prining=lazy(()=>import("../pages/Pricing/Pricing.jsx"))
const Setting=lazy (()=>import("../pages/Dashboard/setting/Setting.jsx"))
const Surveylist= lazy(()=>import("../pages/Dashboard/surveylist/Surveylist.jsx"))
const  Survey =lazy(()=>import("../pages/Dashboard/survey/q12survey/SurveyResponseQuestion.jsx"))
const TEISurveyTemplate=lazy(()=>import("../pages/Dashboard/survey/TEISurvey/TEISurveyResponseQuestions.jsx"))
const Template=lazy(()=>import("../pages/Dashboard/templates/q12template/PreviewQuestion.jsx"))
const Paymentsuccess=lazy(()=>import ("../pages/Pricing/Success.jsx"))
const Guidance =lazy(()=>import("../pages/Guidance/guidance.jsx"))
const TEITemplate = lazy(()=>import("../pages/Dashboard/templates/TEItemplate/TEIPreviewQuestion.jsx"))
const Congratulation=lazy((import("../pages/Dashboard/survey/TEISurvey/TEICongratulation.jsx")))
const config = [
  {
    
  path: '/',
  loginRequired: false,
  layout: PublicLayout,
  component: LandingPage
},

{
  path: '/login',
  loginRequired: false,
  layout: LoginLayout,
  component: LoginScreen
}
,
{
  path: '/signup',
  loginRequired: false,
  layout: LoginLayout,
  component: SignupScreen
},


{
  path: '/forgotpassword',
  loginRequired: false,
  layout: LoginLayout,
  component:ForgotPassword
},
{
  path: '/resetpassword/:id*',
  loginRequired: false,
  layout: LoginLayout,
  component:ResetPassword
}
,
{
  path: '/contact',
  loginRequired: false,
  layout: PublicLayout,
  component:ContactUs
}
,
{
  path: '/products',
  loginRequired: false,
  layout: PublicLayout,
  component: Productsscreen,
},
{
  path: '/enterprise',
  loginRequired: false,
  layout: PublicLayout,
  component: Enterpirse,
},
{
  path: '/templates',
  loginRequired: false,
  layout: PublicLayout,
  component:Templates
}
,
{
  path: '/resources',
  loginRequired: false,
  layout: PublicLayout,
  component:ResourcesScreen
}
,
{
  path: '/accountVerified',
  loginRequired: false,
  layout: LoginLayout,
  component:AccountVerified
},
{
  path: '/q12report',
  loginRequired:true,
  layout: DashboardLayout,
  component:Q12report
},
{
  path: '/startsurvey',
  loginRequired:true,
  layout: DashboardLayout,
  component:StartSurvey
},
{
  path: '/profile',
  loginRequired:true,
  layout: DashboardLayout,
  component:Profile
},
{
  path: '/signout',
  loginRequired:true,
  layout: DashboardLayout,
  component:Signout
},
{
  path: '/pricing',
  loginRequired:false,
  layout: DashboardLayout,
  component:Prining
},
{
  path: '/setting',
  loginRequired:true,
  layout: DashboardLayout,
  component:Setting
},
{
  path: '/surveylist',
  loginRequired:true,
  layout: DashboardLayout,
  component:Surveylist
},

{
  path: '/q12template',
  loginRequired:true,
  layout: DashboardLayout,
  component:Template
},
{
  path: '/TEITemplate',
  loginRequired:true,
  layout: DashboardLayout,
  component:TEITemplate
},
{
  path: '/q12survey/:id*',
  loginRequired:false,
  layout: PublicLayout,
  component:Survey
},
{
  path: '/TeamEffectivenessSurvey/:id*',
  loginRequired:false,
  layout: PublicLayout,
  component:TEISurveyTemplate
},
{
  path: '/thankupage',
  loginRequired:false,
  layout: PublicLayout,
  component:Congratulation
},

{
  path: '/paymentsuccess/:userId/:surveyId*',
  loginRequired:false,
  layout: LoginLayout,
  component:Paymentsuccess
},
{
  path: '/guidance',
  loginRequired: false,
  layout: PublicLayout,
  component:Guidance
},

];

config.propTypes = {
  path: PropTypes.string.isRequired,
  loginRequired: PropTypes.bool,
  layout: PropTypes.elementType.isRequired,
  component: PropTypes.elementType.isRequired
};

export default config;
