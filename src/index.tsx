import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Firebase from './database';
import {
  HomePage, LoginPage, ChatPage,
  LogupPage, ForgetPasswordPage
} from './routes';


// Send analytics to firebase
Firebase.analytics();


const App = ()=> (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ HomePage } />
      <Route path="/login" component={ LoginPage } />
      <Route path="/join" component={ LogupPage } />
      <Route path="/forget-password" component={ ForgetPasswordPage } />
      <Route path="/chat" component={ ChatPage } />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('chatvia-app'));
