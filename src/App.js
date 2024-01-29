import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import userContext from "./userContext";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Components/Home/Home";
import LoginForm from "./Components/LoginForm/LoginForm";
import SignUpForm from "./Components/SignUpForm/SignUpForm";
import UserForm from "./Components/UserForm/UserForm";
import JobList from "./Components/Job/JobList";
import CompanyList from "./Components/Companies/CompanyList";
import CompanyDetails from "./Components/Companies/CompanyDetails";

import JoblyApi from "./api";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  // set up state
  const [ user, setUser ] = useState({})

  // store userData for username in state
  const getUser = async(username) => {
    const res = await JoblyApi.getUser(username);
    setUser({...res.user, token: JoblyApi.token});
  }

  // collect username and token
  useEffect(() => {
    let username = localStorage.getItem("username");
    let token = localStorage.getItem('token');

    // if both are there we update token and username
    if (username && token) {
      JoblyApi.token = token;
      getUser(username);
    } else {
      JoblyApi.token = ""
    }    
  }, []);

  //update local storage, token and state
  const logIn = (data) => {
    localStorage.setItem('username', data.username);
    localStorage.setItem('token', data.token);
    JoblyApi.token = data.token;
    getUser(data.username)
    // console.log(`app.js logIn`)
  }

  // log user out
  const logOut = (data) => {
    localStorage.clear()
    JoblyApi.token = ""
    setUser({});
    // console.log(`app.js logOut`)
  }

  // apply for a job
  const apply = async(jobId) => {
    try {
      const res = await JoblyApi.applyForJob(user.username, jobId);
      // console.log(`App.js apply`)
      getUser(user.username);
    } catch(err) {
      alert(`Unable to apply at this time`)
    }
  }

  return (
    <div className="App">
      <userContext.Provider value={user}>
        <BrowserRouter>
          <NavBar logOut={logOut} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm logIn={logIn} />} />
            <Route path="/signup" element={<SignUpForm logIn={logIn} />} />
            <Route
              path="/users/:username"
              element={<UserForm getUser={getUser} />}
            />
            <Route path="/jobs" element={<JobList apply={apply} />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route
              path="/companies/:handle"
              element={<CompanyDetails applyJob={apply} />}
            />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
