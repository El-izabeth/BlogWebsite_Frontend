
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Dashboard from "./dashboard";
import Profile from "./profile";
import Write from "./write";
import Myworks from "./myworks";
import Friendworks from "./friendworks"
import View from "./view"

function App() {
  return (
    
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/profile/:handle" element={<Profile />}/>
        <Route exact path="/write/:id" element={<Write />}/> 
        <Route exact path="/myworks" element={<Myworks />}/>    
        <Route exact path="/friendworks/:id" element={<Friendworks />}/>
        <Route exact path="/view/:id" element={<View />}/>
      </Routes>
    </Router>
  );
}

export default App;