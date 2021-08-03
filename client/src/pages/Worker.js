import React, { useState, useEffect } from 'react';
import '../App.css';
import './Manager.css'
import UsersInfo from './managerPages/UsersInfo';
//import { matchPath } from "react-router";
import { BrowserRouter as Router, Route, Redirect, Switch, useRouteMatch } from 'react-router-dom'
import Blog from '../components/Layout/Blog';
import axios from 'axios';
import WorkerInfo from '../components/Modals/workerInfo';


const Worker = ({ pagesHandler}) => {
    pagesHandler([{ ref: "/WorkerHome", text: "דף הבית" }, { ref: "/UserInfo", text: "פרטי עובד" }]);
    const [listOfPosts, updateListOfPosts] = useState({
        leftPosts: [{}],
        rightPosts: [{}]
    });

    const user= {
        type: "מנהל",
        id: "208994535",
        fullName: "אלכס כהן",
        userName: "Alex",
        password: "$2b$10$oAGFqI9C4d8wr6CQnzyYwu6d.sr/KhJg18oNh4kZw4ioMa6Nb5ATC", 
        phone: "050-4736633",
        email: "alex@gmail.com", 
        address: "ירושלים עזה 18", 
        image: "/assets/images/avatar4.png",
    }

    useEffect(() => {
        let blogData = []
        axios.post('http://localhost:9000/blog')
          .then(res => {
            blogData = res.data;
            console.log(blogData);
    
            updateListOfPosts(blogData);
    
          })
          .catch(err => {
            console.log(err);
          })
        // },[]
        //get post from server?
      }, []);


    return (
        <div id="workerContainer" style={{ height: "fitContent", "paddingBottom": "106px", "paddingTop": "106px", background: "url(/assets/images/a0010.jpg)" }}>
            <Switch>
                <Route path="/UserInfo" >
                    <WorkerInfo user={user} />
                </Route>
                <Route path="/WorkerHome" >
                    <Blog listOfPosts={listOfPosts} />
                </Route>
                <Redirect from="/" to="/WorkerHome" />
                to: object
            </Switch>
        </div >

    )

}

export default Worker;