import React from 'react';
import './style.scss';
import { Link, RouteChildrenProps } from 'react-router-dom';
import FullLogo from '../../assets/images/full_logo.png';
import TextField from '../../components/textfield';
import { Email, Password, Plus, User, TwitterLogo, GoogleLogo, FacebookLogo } from '../../assets/SVGIcons';
import { CheckEmail, CheckPassword } from '../../helper/CheckInput';
import PlaceholderPhoto from '../../assets/images/user-placeholder.png';


class LogupPage extends React.Component<RouteChildrenProps> {
   InputPhotoRef: React.RefObject<HTMLInputElement>;

   constructor(props: any) {
      super(props);
      this.NameTextField = this.NameTextField.bind(this);
      this.EmailTextField = this.EmailTextField.bind(this);
      this.PasswordTextField = this.PasswordTextField.bind(this);
      this.InputPhotoRef = React.createRef();
   }

   state = {
      name_val: '',
      email_val: '',
      pass_val: '',

      name_err: '',
      email_err: '',
      pass_err: '',
      
      photoUrl: PlaceholderPhoto
   }

   OnBlurInputs(e: any) {
      if(e.target.id === 'email_input') {
         this.setState(state => ({
            ...state,
            email_err: CheckEmail(this.state.email_val.trim()).errMSG
         }));
      } else if(e.target.id === 'pass_input') {
         this.setState(state => ({
            ...state,
            pass_err: CheckPassword(this.state.pass_val.trim()).errMSG
         }));
      } else {
         this.setState(state => ({
            ...state,
            name_err: this.state.name_val.trim().length === 0? 'Please enter your name': ''
         }));
      }
   }

   OnChangeInputs(e: any) {
      if(e.target.id === 'email_input') {
         this.setState(state => ({
            ...state,
            email_val: e.target.value
         }));
      } else if(e.target.id === 'pass_input') {
         this.setState(state => ({
            ...state,
            pass_val: e.target.value
         }));
      } else {
         this.setState(state => ({
            ...state,
            name_val: e.target.value
         }));
      }
   }

   async Submit(e: any) {
      e.preventDefault();
      const emailErr = CheckEmail(this.state.email_val.trim());
      const passErr = CheckPassword(this.state.pass_val.trim());
      const nameErr = this.state.name_val.trim().length === 0? 'Please enter your name': ''

      if (!emailErr.right || !passErr.right || nameErr.length !== 0) {
         this.setState((state: any) => ({
            ...state,
            email_err: emailErr.errMSG,
            pass_err: passErr.errMSG,
            name_err: nameErr
         }));
      } else {
         this.setState((state: any) => ({ 
            ...state, 
            email_err: '', 
            pass_err: '',
            name_err: ''
         }));
         console.log(this.state)
      }
      
   }

   onInputPhotoChange = (e: any) => {
      if (e.target.files && e.target.files[0]) {
         console.log(e.target.files[0])
         this.setState({
            ...this.state,
            photoUrl: URL.createObjectURL(e.target.files[0])
         });
       }
   }

   NameTextField() {
      return(
         <TextField 
            id="name_input"
            label="Name"
            Icon={ User }
            placeholder="Enter Name"
            defaultValue={ this.state.name_val }
            errorMsg={ this.state.name_err }
            onChange={ this.OnChangeInputs.bind(this) }
            onBlur={ this.OnBlurInputs.bind(this) }
         />
      )
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
            margin="1.2rem 0 0 0"
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

   render() {
      return(
         <div className="sign-container">
            <div className="sign-row">
               <img src={ FullLogo } alt="chatvia_logo" className="sign-logo"/>
               <h1>Sign up</h1>
               <p>Get your Chatvia account now.</p>
               <div className="sign-card">
                  <form>
                     <div className="user-photo" title="Add picture" onClick={ () => this.InputPhotoRef.current?.click() }>
                        <img src={ this.state.photoUrl } alt="profile_image" />
                        <Plus className="plus-icon" />
                        <input type="file" className="photo-input-file" accept="image/*" ref={ this.InputPhotoRef } onChange={ this.onInputPhotoChange.bind(this) } />
                     </div>
                     <this.NameTextField />
                     <this.EmailTextField />
                     <this.PasswordTextField />
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
                  <p>Already have an account? <Link to="/login">Sign in</Link></p>
                  <p>©2020 Chatvia. Crafted with <span>&#10084;</span> by Ahmed Arby</p>
               </footer>
            </div>
         </div>
      );
   }
}

export default LogupPage;
