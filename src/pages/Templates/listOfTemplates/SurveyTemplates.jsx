import React from 'react'
import TemplateImage from '../../../assets/templates/templateImage.svg?react'
const SurveyTemplates = ({view}) => {
    const surveylist = [
        {
            img:<TemplateImage style={{width:`${view==='grid' ? '152':'90'}`, height:` ${view==='grid'?'151':'89'}`}}/>,
            title:'Employee Satisfaction Survey Template'
    },
    {
        img:<TemplateImage style={{width:`${view==='grid' ? '152':'90'}`, height:` ${view==='grid'?'151':'89'}`}}/>,
        title:'Employee Satisfaction Survey Template'
},
{
    img:<TemplateImage style={{width:`${view==='grid' ? '152':'90'}`, height:` ${view==='grid'?'151':'89'}`}}/>,
    title:'Employee Satisfaction Survey Template'
},
{
    img:<TemplateImage style={{width:`${view==='grid' ? '152':'90'}`, height:` ${view==='grid'?'151':'89'}`}}/>,
    title:'Employee Satisfaction Survey Template'
},
{
    img:<TemplateImage style={{width:`${view==='grid' ? '152':'90'}`, height:` ${view==='grid'?'151':'89'}`}}/>,
    title:'Employee Satisfaction Survey Template'
},
{
    img:<TemplateImage style={{width:`${view==='grid' ? '152':'90'}`, height:` ${view==='grid'?'151':'89'}`}}/>,
    title:'Employee Satisfaction Survey Template'
},
]
  return (
    <>
    {
    view==='grid'?
     <div className="row">
            {surveylist.map((item,i)=>{
        return(
            <div className="col-md-4 mb-3 col-sm-6 ">
                    <div className="shadow-sm border rounded-3"  key={i}>
                <div className="template-card-image pt-2 d-flex justify-content-center align-items-center" s>
                    {item.img}
                </div>
                <p className='p-4 fw-semibold fs-5'>{item.title}</p>
            </div>
            </div>
        
        )
    })}
    </div>
    :
    <div className="row">
{surveylist.map((item,i)=>{

    return(
<div className="col-md-6 mb-4">
    <div className="border shadow-sm rounded-3">
        <div className="tamplate-list-view-card-image  d-flex justify-content-center align-items-center gap-3">
<div className="template-icon p-2">
    {item.img}
</div>
<p className=''>{item.title}</p>
        </div>
    </div>
</div>
    )
})}
    </div>
}
   

    </>
  )
}

export default SurveyTemplates