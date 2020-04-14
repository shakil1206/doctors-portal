import React, { useState, useEffect } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import mask1 from '../../images/Mask Group 1.png';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Apointment from '../Apointment/Apointment';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faReplyAll } from '@fortawesome/free-solid-svg-icons'



Modal.setAppElement('#root');


const Header = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const [calenderDate, setCalenderDate] = useState(new Date());
    const [apointment, setAppointment] = useState(false);


    const [apointmentDetails, setApointmentDetails] = useState([]);

    const [patientDetails, setPatientDetails] = useState({
        title: '',
        date: '',
        name: '',
        phoneNumber: '',
        email: '',
        gender: '',
        age: '',
        weight: '',
        Action:"Pending",
        isVisited:false,
        time:''
    })

    const [modalOpen, setModalOpen] = useState(false);
    const [modal2isOpen, setModal2isOpen] = useState(false);


    const handleModalOpen = (title, time) => {
        setModalOpen(true);
        patientDetails.title = title;
        patientDetails.time = time;
        const month = (calenderDate.toString()).split(" ")[1];
        const day = (calenderDate.toString()).split(" ")[2];
        const year = (calenderDate.toString()).split(" ")[3];

        patientDetails.date = month + "-" + day + "-" + year;

    }

    const handleCalender = date => {
        setCalenderDate(date);

    }

    const handleAppointment = () => {
        setAppointment(true);
    }


    useEffect(() => {

        fetch('https://warm-eyrie-65386.herokuapp.com/apointment')
            .then(res => res.json())
            .then(data => {
                setApointmentDetails(data);
            })

    }, [])



    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
        }
    };

    var subtitle;
    var subtitle2;
    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#10d0e7';
        subtitle.style.textAlign = 'center';
        subtitle2.style.textAlign = 'center';
    }


    const onSubmit = (data) => {
        patientDetails.name = data.name;
        patientDetails.email = data.email;
        patientDetails.phoneNumber = data.phone;
        patientDetails.gender = data.gender;
        patientDetails.age = data.age;
        patientDetails.weight = data.weight;
        

        fetch('https://warm-eyrie-65386.herokuapp.com/patient', {
            method: 'POST',
            body: JSON.stringify(patientDetails),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                setModalOpen(false);
                setModal2isOpen(true);
            })
    }

    const closeModal = () =>{
        setModal2isOpen(false);
    }

    return (

        <div >
            <div className="banner">
                <div className="top-background"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 d-flex justify-content-end">
                            <nav>
                                <a href="/home">Home</a>
                                <a href="/about">About</a>
                                <a href="/dentalservices">Dental Services</a>
                                <a href="/reviews">Reviews</a>
                                <a href="/Blog">Blog</a>
                                <a href="/dashboard">Dashboard</a>
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5 left-side">
                            {
                                <div style={{ display: apointment && 'none' }}>
                                    <h2>Your New Smile <br /> Starts Here</h2>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, sint repudiandae impedit tenetur, itaque quos suscipit temporibus ab accusamus dolorem quasi consequuntur iste eligendi est natus eius assumenda consequatur molestiae!</p>
                                    <Button className="left-button" onClick={handleAppointment} variant="contained" color="primary">Get Apointment</Button>
                                </div>
                            }
                            {
                                <div style={{ display: apointment ? 'block' : 'none' }}>
                                    <h1 style={{ color: '#1cc7c8' }}>Appointment</h1>
                                    <Calendar
                                        onChange={handleCalender}
                                        value={calenderDate}
                                    />
                                </div>
                            }

                        </div>
                        <div className="col-md-7 right-img">
                            <img src={mask1} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: apointment ? 'block' : 'none' }} className="container">
                <h3 style={{ color: '#1cc7c8', textAlign: 'center' }}>Available Appointments on {(calenderDate.toString()).split(" ")[0]} {(calenderDate.toString()).split(" ")[1]} {(calenderDate.toString()).split(" ")[2]}, {(calenderDate.toString()).split(" ")[3]}  </h3>

            </div>
            <div style={{ display: apointment ? 'block' : 'none' }} className="container">
                <div className="row">
                    {
                        apointmentDetails.map(apointment => <Apointment handleModalOpen={handleModalOpen} key={apointment.key} item={apointment}></Apointment>)
                    }
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Modal
                            isOpen={modalOpen}
                            onRequestClose={() => setModalOpen(false)}
                            style={customStyles}
                            onAfterOpen={afterOpenModal}
                        >

                            <h3 ref={_subtitle => (subtitle = _subtitle)}>{patientDetails.title}</h3>
                            <h6 ref={_subtitle => (subtitle2 = _subtitle)}>On {patientDetails.date}</h6>

                            <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                                <input className="form-control" name="name" ref={register({ required: true })} placeholder="Your Name" />
                                {errors.name && <span className="error">Name is required</span>}
                                <br />
                                <input className="form-control" name="email" ref={register({ required: true })} placeholder="Your Email" />
                                {errors.email && <span className="error">Email is required</span>}
                                <br />
                                <input className="form-control" name="phone" ref={register({ required: true })} placeholder="Phone Number" />
                                {errors.phone && <span className="error">Phone is required</span>}
                                <br />
                                <input className="form-control" name="gender" ref={register({ required: true })} placeholder="Your Gender" />
                                {errors.gender && <span className="error">Gender is Required</span>}
                                <br />
                                <input className="form-control" name="age" type="number" ref={register({ required: true })} placeholder="Your Age" />
                                {errors.age && <span className="error">Age is Required</span>}
                                <br />

                                <input className="form-control" name="weight" type="number" ref={register({ required: true })} placeholder="Your Weight" />
                                {errors.weight && <span className="error">Weight is Required</span>}
                                <br />
                                <input className="form-control btn btn-success" type="submit" value="Submit" />
                            </form>
                        </Modal>
                        <Modal
                            isOpen={modal2isOpen}
                            onRequestClose={() => setModal2isOpen(false)}
                            style={customStyles}
                            onAfterOpen={afterOpenModal}
                            onRequestClose={closeModal}
                        >

                            <h3 ref={_subtitle => (subtitle = _subtitle)}>Your information has been sucessfully placed!</h3>
                            <h1 className="circle"><FontAwesomeIcon icon={faCheckCircle} /><br /> Success</h1>

                            <h6 ref={_subtitle => (subtitle2 = _subtitle)}>Don't forget to come on {patientDetails.date}</h6>

                            <div className="d-flex justify-content-center">
                                <button onClick={closeModal} className="circle btn btn-success btn"><FontAwesomeIcon className="btn-icon" icon={faReplyAll} /></button>
                            </div>
                        </Modal>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Header;