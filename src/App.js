import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import CreateLink from './Link/CreateLink'
import SearchLinks from './Link/SearchLinks'
import Login from './Auth/Login'
import ForgotPassword  from './Auth/ForgotPassword'
import LinkList from './Link/LinkList'
import LinkDetail from './Link/LinkDetail'
import Navbar from './components/Navbar'
import useAuth from './Auth/useAuth'
import firebase, {FirebaseContext} from './firebase'

function App() {
  const user = useAuth()
  return (
    
    <BrowserRouter>
    <FirebaseContext.Provider value={{user, firebase}}>
     <div>
     <Navbar/>
     <div>
     <Switch>
      <Route exact path='/' render={() => <Redirect to='/new/1' />}/>
      <Route path='/create' component={CreateLink}/>
      <Route path='/login' component={Login}/>
      <Route path='/forgot' component={ForgotPassword}/>
      <Route path='/search' component={SearchLinks}/>
      <Route path='/top' component={LinkList}/>
      <Route path='/new/:page' component={LinkList}/>
      <Route path='/link/:linkId' component={LinkDetail}/>
    </Switch>
     </div>
     </div>
     </FirebaseContext.Provider>
    </BrowserRouter>
    
  );
}

export default App;
