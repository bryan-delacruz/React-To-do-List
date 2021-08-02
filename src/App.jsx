import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Reset from "./components/Reset";

import { auth } from "./firebase";

function App() {

  const [firebaseUser,setFirebaseUser]=React.useState(false)

  React.useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      console.log(user)
      if (user){
        setFirebaseUser(user)
      }else{
        setFirebaseUser(null)
      }
    })
  },[])

  return firebaseUser !== false?(
    <Router>
      <div className="container">
        <Navbar firebaseUser={firebaseUser}></Navbar>
        <Switch>
          <Route path="/" exact>
            inicio ...
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
          <Route path="/reset">
            <Reset></Reset>
          </Route>
        </Switch>
      </div>
    </Router>
  ):(
    <p>Cargando ...</p>
  )
}

export default App;
