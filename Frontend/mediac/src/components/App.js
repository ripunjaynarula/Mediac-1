import React from "react"
import Signup from "./Signup"
import Navbar from "./Navbar"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import VerificationSent from './VerificationSent'

function App() {
  return (
    
    
      
      
        
        <Router>
          <div className="Navb"><Navbar /></div>
          <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
          
        
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <AuthProvider>
            <Switch >
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/verification-sent" component={VerificationSent} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
          </div>
          </Container>
        </Router>
      
    
    
  )
}

export default App
