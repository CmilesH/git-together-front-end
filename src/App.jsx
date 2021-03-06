import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ProfileDetails from './pages/ProfileDetails/ProfileDetails'
import SocialFeed from './pages/SocialFeed/SocialFeed'
import MyProjects from './components/MyProjects/MyProjects'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import AddSocialPost from './pages/AddSocialPost/AddSocialPost'
import EditSocialPost from './pages/EditSocialPost/EditSocialPost'
import './App.css'
import MyProjectDetails from './pages/MyProjectDetails/MyProjectDetails'
import AddProject from './pages/AddProject/AddProject'
import EditProject from './pages/EditProject/EditProject'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <div className="App">
      <NavBar user={user} handleLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Landing user={user} />} />
          <Route
            path="/signup"
            element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
          />
          <Route
            path="/login"
            element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
          />
          <Route
            path="/profiles"
            element={user ? <Profiles user={user} /> : <Navigate to="/login" />}
          />
            <Route
            path="/profile"
            element={user ? <ProfileDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/changePassword"
            element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
          />
          <Route 
            path="/myProjects" 
            element={user ? <MyProjects  user={user}/> : <Navigate to="/login"/>} 
          />
          <Route 
            path="/socialFeed" 
            element={user ? <SocialFeed user={user}/> : <Navigate to="/login" />} 
          />
          <Route
            path="/addSocialPost"
            element={user ? <AddSocialPost /> : <Navigate to="/login" />} 
          />
          <Route
            path="/editSocialPost"
            element={user ? <EditSocialPost /> : <Navigate to="/login" />} 
          />
          <Route
            path="/project"
            element={user ? <MyProjectDetails user={user} /> : <Navigate to="/login" />} 
          />
          <Route
            path="/myProjects/new"
            element={user ? <AddProject user={user} /> : <Navigate to="/login" />} 
          />
          <Route
            path="/editProject"
            element={user ? <EditProject /> : <Navigate to="/login" />} 
          />
        </Routes>
      </main>
    </div>  
  )
}

export default App
