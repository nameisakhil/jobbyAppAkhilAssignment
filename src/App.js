import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import JobsSection from './components/JobsSection'
import JobDetailsSection from './components/JobDetailsSection'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={JobsSection} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetailsSection} />
    <Route component={NotFound} />
  </Switch>
)
export default App
