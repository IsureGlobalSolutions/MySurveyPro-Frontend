import React from 'react'
import { MdErrorOutline } from "react-icons/md";
import Modal from 'react-modal';
import './delete.css'
import Logo from '../../assets/svgs/logoWithTitle.svg?react';
import LogoutIcon from '../../assets/dashboredsvg/modalLogout.svg?react';
import WebsiteButton from '../mySurveyProWebsiteBtn/WebsiteButtton';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding:'0px 0px',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
    minWidth:"500px",
    minHeight:"300px",
backgroundColor:"#F8F8F8"

  },
};


const DeleteModal = ({show,handleClosedata,deleteHandler}) => {
  return (
    <Modal
    isOpen={show}
    // onAfterOpen={afterOpenModal}
    onRequestClose={handleClosedata}
    style={customStyles}
    contentLabel="Example Modal"
  >
   
<div className="d-flex justify-content-between align-items-center border-bottom pb-1 bg-white p-2">
    <Logo width={50} height={50}  />
   <button
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{ }}
            onClick={handleClosedata}
          ></button>
</div>



      <div className="d-flex flex-column align-items-center justify-content-center  bg-white  ">
        <div className="delte-icon-circle my-3">
          <LogoutIcon  />
          
        </div>
        <p style={{color:"#DC3449"}}>Delete Note</p>
        <div className=" w-100 border-top text-center pt-3 logout-button-main">
            <div severity="success ps-4" style={{ fontSize: "20px" }}>
            Are you sure you want to delete?
        </div>  
         <div
       className='d-flex justify-content-center gap-3 mt-2 pb-4'
      >
        <WebsiteButton
          type="button"
          className=""
          buttonDesign='outliner'
          onClick={handleClosedata}
        >
          Cancel
        </WebsiteButton>
        <WebsiteButton
          type="button"
        style={{backgroundColor:"#DC3449"}}
         
          onClick={deleteHandler}
        >
          Delete
        </WebsiteButton>
      </div>
        </div>
        
      </div>
   
  
  </Modal>
  )
}

export default DeleteModal