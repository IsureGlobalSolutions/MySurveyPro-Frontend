import { useEffect, useState } from 'react';
import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import img2 from '../../../../assets/Q12survey/Q12cardimage1.png';
import './Q12survey.css';
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Congratulationsurvey from './Congratulationsurvey';
import { useDispatch, useSelector } from 'react-redux';
import { getSurveyById, surveyresponse } from '../../../../Redux/slice/authSlice';
import toast from 'react-hot-toast';
import Loader from '../../../../components/plugins/Loader';
import Q12survey from './Q12survey';
import img1 from '../../../../assets/Q12survey/stepperimage.png';
import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom';

const SurveyResponseQuestion = () => {
    const Q12SurveyId = useSelector((state) => state.user.selectedSurveyId);
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [staffid, setstaffid] = useState('');
    const {isLoading,userData} =useSelector((state)=>state.user)
    const {id}=useParams();
 
  const userid = id;
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(111);
    const [selectchoiseid, setselectchoiseid] = useState([]);

    useEffect(() => {
        fetchSurveyData(Q12SurveyId);
        loadProgress();
        clearProgress();
    }, [dispatch]);

    const fetchSurveyData = async (Q12SurveyId) => {
        try {
            const res = await dispatch(getSurveyById(Q12SurveyId));
            setData(res?.payload.questions);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const loadProgress = () => {
        const savedStep = localStorage.getItem('activeStep');
        const savedChoices = localStorage.getItem('selectchoiseid');
        if (savedStep ) setActiveStep(Number(savedStep));
        if (savedChoices) setselectchoiseid(JSON.parse(savedChoices));
    };

    const saveProgress = () => {
        localStorage.setItem('activeStep', activeStep+1);
        localStorage.setItem('selectchoiseid', JSON.stringify(selectchoiseid));
    };

    const handlechoiseID = (choiseid) => {
        setselectchoiseid(prevchoiceid => ({
            ...prevchoiceid,
            [activeStep]: choiseid,
        }));
    };

    const clearProgress = () => {
        localStorage.removeItem('activeStep');
        localStorage.removeItem('selectchoiseid');
    };

   
const handleNext = async () => {
    const currentDimension = data.dimensions[activeStep];
    const navigate = useNavigate();

    // Check if all questions in the current dimension are answered
    const allAnswered = currentDimension.questions.every(
        (question) => selectchoiseid[question.questionId] !== undefined
    );

    if (!allAnswered) {
        toast.error("Please answer all questions before proceeding.");
        return;
    }

    try {
        // Prepare API request data for all questions in the current dimension
        const responses = currentDimension.questions.map((question) => ({
            questionId: question.questionId,
            choiceId: selectchoiseid[question.questionId],
            recipientId: Number(staffid),
            userId: userid,
            surveyId: question.surveyId, // Assuming surveyId is part of the question object
        }));

        // Dispatch responses as a batch or individual calls
        for (const response of responses) {
            await dispatch(surveyresponse(response));
        }

        saveProgress();

        if (activeStep < data.dimensions.length - 1) {
            // Move to the next dimension
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
            // Final dimension - handle end of survey logic
            clearProgress();
            navigate('/thank-you'); // Redirect to the Thank You page
        }
    } catch (error) {
        toast.error(error.message || "An error occurred. Please try again.");
    }
};

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        saveProgress();
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <div><Loader/></div>;
    }

    const getValueFromIdComponent = (value) => {
        setActiveStep(value);
    };
     const sendIdParent=(value) => {
      
        setstaffid(value);
     }
    return (
        <>
            {activeStep === 111 ? (
                <Q12survey setstaffid={setstaffid} stepUPSendValue={getValueFromIdComponent}  sendIdParent={sendIdParent}  />
            ) : activeStep === data.length ? ( 
                <div className=' '>
                    <div className='d-flex justify-content-start flex-wrap gap-5 mb-4 m-0 p-4'>
                        <div className="steppercard d-flex flex-column align-items-start w-100">
                            <img type="button" src={img1} className="card-img img-fluid mb-3" alt="Survey Stepper" />
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12 p-5'>
                                        <Congratulationsurvey />
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
                            <img type="button" src={img1} className="card-img img-fluid mb-3" alt="Survey Stepper" />
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-12 p-5'>
                                        <div className='row'>
                                            <div className='col-12 col-md-7 surveyQuestion'>
                                                <div className='text-start gap-3'>
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
                                                                    <input type="checkbox" className="form-check-input" id={`choice${choice.choiceId}`}
                                                                        onChange={() => handlechoiseID(choice.choiceId)}
                                                                        checked={selectchoiseid[activeStep] === choice.choiceId}
                                                                    />
                                                                    <span className='ms-2 checkmark'>{choice.text}</span>
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
                   {isLoading? 'loading...':'Next'}
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
                                                </div>
                                            </div>
                                            <div className='col-12 col-md-5 d-flex justify-content-center justify-content-md-end ps-md-5 mt-3 mt-md-0'>
                                                <img type="button" src={img2} className="img-fluid" alt="Survey Visual" />
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

export default SurveyResponseQuestion;
