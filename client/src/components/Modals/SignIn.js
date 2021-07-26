import React, { useState } from 'react';
import './SignIn.css'
import Input from '../../shared/components/Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import axios from 'axios';


async function loginUser(credentials) {
    console.log(credentials)
    // return fetch('http://localhost:9000/login', {
    //     method: 'Post',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(credentials)
    // })
    //     .then(data => {
    //         // data.json();
    //         console.log(data)
    //     })
}




const SignIn = ({ handleClose, display, setToken, authenticate }) => {
    let inDisplay;
    display ? inDisplay = 'block' : inDisplay = 'none';

    const [usernameinfo, setUserName] = useState();
    const [passwordinfo, setPassword] = useState();
    // const handleSubmit = async e => {
    //     console.log("in handle")
    //     e.preventDefault();
    //     // const token = await loginUser({
    //     //     username,
    //     //     password
    //     // });
    //     // setToken(token);
    //     //check- this will be the answer from the server after authentication
    //     setTimeout(() => authenticate({
    //         type: 'manager', userName: 'oria'
    //     }), 2000)
    // }

    const handleSubmit = async e => {
        e.preventDefault();

        const data = {
            username: usernameinfo,
            password: passwordinfo
        }
        console.log(data);
        axios.post('http://localhost:9000/login', data)
            .then(res => {
                console.log(res);
                if (res.status == 200){
                    setTimeout(() => authenticate({
                        type: 'manager', userName: 'oria'
                    }), 2000)
                }
            //    else {

            //    }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <modal className="popup-box" style={{ display: inDisplay }}>
            <div className="container container-width boxSignIn" style={{ top: "20px" }}>
                <div className="card login-card">
                    <div className="row no-gutters" style={{ display: "flex", flexDirection: "row-reverse" }}>
                        <div className="col-md-5">
                            <img src="login.jpg" alt="login" className="login-card-img" />
                        </div>
                        <span className="close-icon" onClick={handleClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                        <div className="col-md-7" style={{ display: "flex" }}>
                            <div className="card-body" dir="rtl" style={{ display: " flex", flexDirection: "column" }}>
                                <div className="brand-wrapper">
                                    <img src="logo2.svg" alt="logo" className="logo" />
                                </div>
                                <p className="login-card-description" dir="rtl" style={{ textAlign: "center" }}>כניסה למערכת</p>
                                <form action='#'>
                                    <div className="form-group">
                                        <Input type="text" name="userName" id="userName" placeholder="שם משתמש" onChange={e => setUserName(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-4">
                                        <Input type="password" name="password" id="password" placeholder="סיסמה" onChange={e => setPassword(e.target.value)} />
                                    </div>
                                    <button name="login" id="login" onClick={handleSubmit} style={{ width: "118px", height: "50px", marginLeft: "52px", background: 'rgb(59, 182, 177)', borderRadius: "17px", color: '#fff' }} >התחבר
                                    </button>
                                </form>
                                {/* <a href="" className="forgot-password-link" style={{ textAlign: "center" }}>שכחתי סיסמה</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </modal>

    )
}

SignIn.propTypes = {
    setToken: PropTypes.func.isRequired
}


export default SignIn;