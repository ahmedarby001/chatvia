import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
import FullLogo from '../../assets/images/full_logo.png';
import TextField from '../../components/textfield';
import CheckBox from '../../components/checkbox';
import { Email, FacebookLogo, GoogleLogo, Password, TwitterLogo } from '../../assets/SVGIcons';
import { CheckEmail, CheckPassword } from '../../helper/CheckInput';


class LoginPage extends React.Component {

   constructor(props: any) {
      super(props);
      this.CustomCheckBox = this.CustomCheckBox.bind(this);
      this.EmailTextField = this.EmailTextField.bind(this);
      this.PasswordTextField = this.PasswordTextField.bind(this);
   }

   state = {
      email_val: '',
      pass_val: '',

      email_err: '',
      pass_err: '',

      rememberMe: false
   }

   OnBlurInputs(e: any) {
      if(e.target.id === 'email_input') {
         this.setState(state => ({
            ...state,
            email_err: CheckEmail(this.state.email_val.trim()).errMSG
         }));
      } else {
         this.setState(state => ({
            ...state,
            pass_err: CheckPassword(this.state.pass_val.trim()).errMSG
         }));
      }
   }

   OnChangeInputs(e: any) {
      if(e.target.id === 'email_input') {
         this.setState(state => ({
            ...state,
            email_val: e.target.value
         }));
      } else {
         this.setState(state => ({
            ...state,
            pass_val: e.target.value
         }));
      }
   }

   async Submit(e: any) {
      e.preventDefault();
      const emailErr = CheckEmail(this.state.email_val.trim());
      const passErr = CheckPassword(this.state.pass_val.trim());
      
      if (!emailErr.right || !passErr.right) {
         this.setState((state: any) => ({
            ...state,
            email_err: emailErr.errMSG,
            pass_err: passErr.errMSG
         }));
      } else {
         this.setState((state: any) => ({ ...state, email_err: '', pass_err: '' }));
         
      }
      
   }

   EmailTextField() {
      return(
         <TextField 
            id="email_input"
            label="Email"
            Icon={ Email }
            placeholder="Enter E-mail"
            defaultValue={ this.state.email_val }
            errorMsg={ this.state.email_err }
            onChange={ this.OnChangeInputs.bind(this) }
            onBlur={ this.OnBlurInputs.bind(this) }
         />
      )
   }

   PasswordTextField() {
      return(
         <TextField 
            id="pass_input"
            type="password"
            label="Password"
            Icon={ Password }
            placeholder="Enter password"
            defaultValue={ this.state.pass_val }
            errorMsg={ this.state.pass_err }
            margin="1.2rem 0 0 0"
            onChange={ this.OnChangeInputs.bind(this) }
            onBlur={ this.OnBlurInputs.bind(this) }
         />
      )
   }

   CustomCheckBox() {
      const Toggle = (e: any) => {
         this.setState((state: any) => ({
            ...state,
            rememberMe: !state.rememberMe
         }))
      }

      return(
         <CheckBox 
            label="Remember me" 
            isChecked={ this.state.rememberMe }
            setState={ Toggle }
         />
      );
   }

   render() {
      return(
         <div className="sign-container">
            <div className="sign-row">
               <img src={ FullLogo } alt="chatvia_logo" className="sign-logo"/>
               <h1>Sign in</h1>
               <p>Sign in to continue to Chatvia.</p>
               <div className="sign-card">
                  <form>
                     <this.EmailTextField />
                     <this.PasswordTextField />
                     <Link to="/forget-password" className="forget-pass">
                        Forget Password
                     </Link>
                     <this.CustomCheckBox />
                     <button onClick={ this.Submit.bind(this) }>Sign in</button>
                     <div className="or-line"></div>
                     <div className="or-sign">
                        <div className="or-sign-item" title="Sign with Google account"><GoogleLogo /></div>
                        <div className="or-sign-item" title="Sign with Facebook account"><FacebookLogo /></div>
                        <div className="or-sign-item" title="Sign with Twitter account"><TwitterLogo /></div>
                     </div>
                  </form>
               </div>
               <footer>
                  <p>Don't have an account ? <Link to="/join">Sign up now</Link></p>
                  <p>©2020 Chatvia. Crafted with <span>&#10084;</span> by Ahmed Arby</p>
               </footer>
            </div>
         </div>
      );
   }
}

export default LoginPage;
