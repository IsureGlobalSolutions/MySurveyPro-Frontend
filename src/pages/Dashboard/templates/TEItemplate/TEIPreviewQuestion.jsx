import {useEffect , useState} from 'react';
import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import img2 from '../../../../assets/Q12survey/Q12cardimage1.png';
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch } from 'react-redux';
import { getSurveyById } from '../../../../Redux/slice/auth';
import toast from 'react-hot-toast';
import Loader from '../../../../components/plugins/Loader';
import img1 from '../../../../assets/Q12survey/stepperimage.png'
import './TEItemplate.css'
import PreveiwCongratulationsurvey from '../q12template/PreveiwCongratulationsurvey';
import TEItemplate from './TEItemplate';
import img3 from '../../../../assets/Q12survey/Figon_Component.png';
const TEIPreviewQuestion = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(111);
    // const fetchSurveyData = async () => {
    //     try {
    //         const res = await dispatch(getSurveyById());
    //         setData(res?.payload?.questions || []);
    //     } catch (error) {
    //         toast.error(error)
    //     }
    // };
    const TEIPreviewQuestions=[
        {
             questionId: 1,
            questionText: "I have a clear understanding of what is ",
            choices: [
                {
                    choiceId: 1,
                    text: "Strongly Disagree"
                },
                {
                    choiceId: 2,
                    text: " Disagree"
                },
                {
                    choiceId: 3,
                    text: "Neutral"
                },
                {
                    choiceId: 4,
                    text: "Agree"
                },
                {
                    choiceId: 5,
                    text: "Strongly Agree"
                },
            ]
        },
        {
            questionId: 2,
            questionText: "I have the tools and resources ",
            choices: [
                {
                    "choiceId": 6,
                    "text": "Strongly Disagree"
                },
                {
                    "choiceId": 7,
                    "text": "Disagree"
                },
                {
                    "choiceId": 8,
                    "text": "Neutral"
                },
                {
                    "choiceId": 9,
                    "text": "Agree"
                },
                {
                    "choiceId": 10,
                    "text": "Strongly Agree"
                }
            ]
        },
        {
            questionId: 3,
            questionText: "I have the tools and resources to find the best way?",
            choices: [
                {
                    "choiceId": 6,
                    "text": "Strongly Disagree"
                },
                {
                    "choiceId": 7,
                    "text": "Disagree"
                },
                {
                    "choiceId": 8,
                    "text": "Neutral"
                },
                {
                    "choiceId": 9,
                    "text": "Agree"
                },
                {
                    "choiceId": 10,
                    "text": "Strongly Agree"
                }
            ]
        },
        {
            questionId: 4,
            questionText: "I have the tools and resources  for better appraoch",
            choices: [
                {
                    "choiceId": 6,
                    "text": "Strongly Disagree"
                },
                {
                    "choiceId": 7,
                    "text": "Disagree"
                },
                {
                    "choiceId": 8,
                    "text": "Neutral"
                },
                {
                    "choiceId": 9,
                    "text": "Agree"
                },
                {
                    "choiceId": 10,
                    "text": "Strongly Agree"
                }
            ]
        },
        {
            questionId: 5,
            questionText: "Please provide any additional feedback:",
            // This question will have an input field instead of choices
        },
    ]
    const fetchSurveyData = ()=>{
        setData(TEIPreviewQuestions);
    }
    useEffect(() => {
        fetchSurveyData();
    }, [dispatch]);

    const handleNext = () => {
        if (activeStep < data.length - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            setActiveStep(data.length);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <div><Loader/></div>;
    }
   const handleactivestep =(value) => {
    setActiveStep(value)
   }
    return (
        <>
            {activeStep===111 ?(
                <TEItemplate stepUPSendValue={handleactivestep}/>
        ) : activeStep === data.length ? (
                <div className=' '>
                <div className='d-flex justify-content-start flex-wrap gap-5 mb-4 m-0 p-4'>
                  <div className="steppercard d-flex flex-column align-items-start w-100">
                    <img type="button" src={img1} className="card-img img-fluid mb-3" />
                    <div className='container'>
                      <div className='row'>
                        <div className='col-12 p-5'>
                          <div className='row'>
                          <PreveiwCongratulationsurvey/>
                          </div>
                        </div>
                      </div>
                    </div>        
                  </div>
                </div>
              </div>
            ) : (
                <div className=' '>
                <div className='d-flex justify-content-start flex-wrap gap-5 mb-4 m-0 p-4'>
                  <div className="steppercard d-flex flex-column align-items-start w-100">
                    <img type="button" src={img1} className="card-img img-fluid mb-3" />
                    <div className='container'>
                      <div className='row'>
                        <div className='col-12 p-5'>
                           <div className='row' >
                    <div className='col-12 col-md-7 surveyQuestion'>
                        {/* <div className='text-start gap-3'>
                            <Box className="ms-5" sx={{ maxWidth: 900 }}>
                                <Box>
                                    <Paper
                                        square
                                        elevation={0}
                                        sx={{
                                            display: "flex",
                                            alignItems: "start",
                                            flexDirection: "column"
                                        }}
                                    >
                                        <h1 className='ms-1'>Question {data[activeStep].questionId}</h1>
                                        <p className='ms-2'>{data[activeStep].questionText}</p>
                                    </Paper>
                                    {data[activeStep].choices.map((choice) => (
                                        <Paper
                                            key={choice.choiceId}
                                            square
                                            elevation={0}
                                            sx={{
                                                display: "flex",
                                                alignItems: "start",
                                            }}
                                            className='mt-3 ms-2'
                                        >
                                        
                                            <input type="checkbox" className="form-check-input" id={`choice${choice.choiceId}`} />
                                            <span className='ms-3 checkmark'>{choice.text}</span>
                                        </Paper>
                                    ))}
                                    <Box sx={{ height: 25, width: "100%", p: 2 }}>
                                        {data[activeStep].description}
                                    </Box>
                                    <MobileStepper
                                        variant="text"
                                        steps={data.length}
                                        position="static"
                                        activeStep={activeStep}
                                        nextButton={
                                            <WebsiteButton
                                                size="small"
                                                onClick={handleNext}
                                                disabled={activeStep === data.length}
                                            >
                                                Next
                                                {theme.direction === "rtl" ? (
                                                    <KeyboardArrowLeft />
                                                ) : (
                                                    <KeyboardArrowRight />
                                                )}
                                            </WebsiteButton>
                                        }
                                        backButton={
                                            <WebsiteButton>
                                                <Button
                                                    size="small"
                                                    onClick={handleBack}
                                                    disabled={activeStep === 0}
                                                >
                                                    {theme.direction === "rtl" ? (
                                                        <KeyboardArrowRight />
                                                    ) : (
                                                        <KeyboardArrowLeft />
                                                    )}
                                                    Back
                                                </Button>
                                            </WebsiteButton>
                                        }
                                    />
                                </Box>
                            </Box>
                        </div> */}
                    </div>
                    {/* <div className='col-12 col-md-5 d-flex justify-content-center  justify-content-md-end ps-md-5 mt-3 mt-md-0'>
                        <img type="button" src={img2} className="img-fluid" alt="Survey Visual" />
                    </div> */}
                    {/* <div className='tableheader m-0 p-0'> */}
                        {/* <div className='table-body  p-2 '>
                        <div className="d-flex align-items-center ">
      <img src={img3} alt="Image" className="custom-img"  />
      <span className="ms-2 me-2" style={{ fontSize: '18px', color: 'white' }}>1.</span> 
      <span style={{ fontSize: '18px', color: 'white' }}>Focus on result</span>
    </div>
                        
                        </div>
                        {data.map((question, index) => (

                        <div className='Question-section pt-1 mt-3'>
                                                            <div className='m-3 d-flex question-text gap-2'>
                                                                <span className=''> Q{question.questionId}:</span>
                                                                <span>
                                                                    <hr style={{
                                                                        border: 'none',
                                                                        borderLeft: '3px solid #f97300',
                                                                        height: '90%',
                                                                        marginRight: '0px',
                                                                        top: 0,
                                                                        marginTop: '0px',
                                                                    }} />
                                                                </span>
                                                                <h3 className=''>{question.questionText}</h3>
                                                            </div>
                                                            {question.questionId ==5 ? (
                                                                <Box className='Question-userinput d-flex gap-5 p-2 mt-0 pt-0'>
                                                                <Paper
                                                                    square
                                                                    elevation={0}
                                                                    sx={{
                                                                        display: "flex",
                                                                        alignItems: "start",
                                                                    }}
                                                                    className='ms-2 userinput'
                                                                >
                                                                    <textarea
                                                                        // value={userAnswers[question.questionId] || ''}
                                                                        onChange={(e) => handleUserInput(question.questionId, e.target.value)}
                                                                        className="form-control"
                                                                        rows="4"
                                                                        placeholder="Eneter answer"
                                                                        
                                                                    />
                                                                </Paper>
                                                            </Box>
                                                            ) : 
                                                            (
                                                              <Box className='Question-options d-flex gap-5 p-2 mt-0 pt-0'>
                                                                {question.choices.map((choice) => (
                                                                    <Paper
                                                                        key={choice.choiceId}
                                                                        square
                                                                        elevation={0}
                                                                        sx={{
                                                                            display: "flex",
                                                                            alignItems: "start",
                                                                        }}
                                                                        className='ms-2'
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            className="form-check-input-TEI mt-1"
                                                                            id={`choice${choice.choiceId}`}
                                                                        />
                                                                        <span className='ms-2 TEIcheckmark'>{choice.text}</span>
                                                                    </Paper>
                                                                ))}
                                                            </Box>             
                                                            )}
                                                           
                                                            
                                                        </div>
                        ))} */}
                                            <div className='tableheader m-0 p-0'>

                        <div className='table-body  p-2 '>
                        <div className="d-flex align-items-center ">
      <img src={img3} alt="Image" className="custom-img"  />
      <span className="ms-2 me-2" style={{ fontSize: '18px', color: 'white' }}>1.</span> 
      <span style={{ fontSize: '18px', color: 'white' }}>Focus on result</span>
    </div>
                        
                        </div>
                        {data.map((question) => (

                       <div className='p-2 pt-1 pb-1'>
                         <div className='Question-section  mt-1'>
                            <div className='question-question-nmber p-2 ps-3'>  Question {question.questionId}</div>
                                                            <div className='m-3 d-flex question-text gap-2'>
                                                                <span className=''> {question.questionId} </span>
                                                                <span>
                                                                    <hr style={{
                                                                        border: 'none',
                                                                        borderLeft: '3px solid #f97300',
                                                                        height: '90%',
                                                                        marginRight: '0px',
                                                                        top: 0,
                                                                        marginTop: '0px',
                                                                    }} />
                                                                </span>
                                                                <h3 className=''>{question.questionText}</h3>
                                                            </div>
                                                            {question.questionId ==5 ? (
                                                                <Box className='Question-userinput d-flex gap-5 p-2 mt-0 pt-0'>
                                                                <Paper
                                                                    square
                                                                    elevation={0}
                                                                    sx={{
                                                                        display: "flex",
                                                                        alignItems: "start",
                                                                    }}
                                                                    className='ms-2 userinput'
                                                                >
                                                                    <textarea
                                                                        // value={userAnswers[question.questionId] || ''}
                                                                        onChange={(e) => handleUserInput(question.questionId, e.target.value)}
                                                                        className="form-control"
                                                                        rows="4"
                                                                        placeholder="Eneter answer"
                                                                        
                                                                    />
                                                                </Paper>
                                                            </Box>
                                                            ) : 
                                                            (
                                                              <Box className='Question-options d-flex gap-5 p-2 mt-0 pt-0'>
                                                                {question.choices.map((choice) => (
                                                                    <Paper
                                                                        key={choice.choiceId}
                                                                        square
                                                                        elevation={0}
                                                                        sx={{
                                                                            display: "flex",
                                                                            alignItems: "start",
                                                                        }}
                                                                        className='ms-2'
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            className="form-check-input-TEI mt-1"
                                                                            id={`choice${choice.choiceId}`}
                                                                        />
                                                                        <span className='ms-2 TEIcheckmark'>{choice.text}</span>
                                                                    </Paper>
                                                                ))}
                                                            </Box>             
                                                            )}
                                                           
                                                            
                                                        </div>
                        </div>
                        
                        ))}
                       
                                    <MobileStepper
                                        variant="text"
                                        steps={data.length}
                                        position="static"
                                    
                                        activeStep={activeStep}
                                        nextButton={
                                            
                                            <WebsiteButton
                                                size="small"
                                                onClick={handleNext}
                                                disabled={activeStep === data.length}
                                            >
                                                Next
                                                {theme.direction === "rtl" ? (
                                                    <KeyboardArrowLeft />
                                                ) : (
                                                    <KeyboardArrowRight />
                                                )}
                                            </WebsiteButton>
                                        }
                                        backButton={
                                            <WebsiteButton                                                    
 >
                                                <Button
                                                    size="small"
                                                    onClick={handleBack}
                                                    disabled={activeStep === 0}

                                                >
                                                    {theme.direction === "rtl" ? (
                                                        <KeyboardArrowRight />
                                                    ) : (
                                                        <KeyboardArrowLeft />
                                                    )}
                                                    Back
                                                </Button>
                                            </WebsiteButton>
                                        }
                                    />
                   </div>
                 
                </div>
                        </div>
                      </div>
                    </div>        
                  </div>
                </div>
              </div>
              

             
            )}
        </>
    );
};

export default TEIPreviewQuestion;



