import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import FullLogo from "../../assets/images/full_logo.png";
import TextField from "../../components/textfield";
import { Email } from "../../assets/SVGIcons";
import { CheckEmail } from "../../helper/CheckInput";
import Authentication from "../../database/auth";
import { AnimatePresence, motion } from "framer-motion";

class ForgetPasswordPage extends React.Component {
   constructor(props: any) {
      super(props);
      this.EmailTextField = this.EmailTextField.bind(this);
   }

   state = {
      email_val: "",
      email_err: "",
      alert_msg: "Enter your Email and instructions will be sent to you!",
      loading: false,
   };

   EmailTextField() {
      return (
         <TextField
            id="email_input"
            label="Email"
            Icon={Email}
            placeholder="Enter E-mail"
            defaultValue={this.state.email_val}
            errorMsg={this.state.email_err}
            onChange={this.OnChangeInputs.bind(this)}
            onBlur={this.OnBlurInputs.bind(this)}
         />
      );
   }

   Loading = () => <motion.div></motion.div>;

   OnBlurInputs(e: any) {
      if (e.target.id === "email_input") {
         this.setState((state) => ({
            ...state,
            email_err: CheckEmail(this.state.email_val.trim()).errMSG,
         }));
      }
   }

   OnChangeInputs(e: any) {
      if (e.target.id === "email_input") {
         this.setState((state) => ({
            ...state,
            email_val: e.target.value,
         }));
      }
   }

   async Submit(e: any) {
      e.preventDefault();
      const emailErr = CheckEmail(this.state.email_val.trim());

      if (!emailErr.right) {
         this.setState((state: any) => ({
            ...state,
            email_err: emailErr.errMSG,
         }));
      } else {
         this.setState((state: any) => ({
            ...state,
            email_err: "",
            loading: true,
         }));

         const Success = () => {
            this.setState((state) => ({
               ...state,
               email_err: "",
               alert_msg: "Check your mail and reset your password.",
               loading: false,
            }));
         };
         const Error = (err: any) => {
            this.setState((state) => ({
               ...state,
               email_err: err,
               loading: false,
            }));
         };

         Authentication.SendPasswordResetEmail(
            this.state.email_val,
            Success,
            Error
         );
      }
   }

   render() {
      return (
         <div className="sign-container">
            <div className="sign-row">
               <img src={FullLogo} alt="chatvia_logo" className="sign-logo" />
               <h1>Reset Password</h1>
               <p>Reset Password With Chatvia.</p>
               <div className="sign-card">
                  <form>
                     <div className="alert-msg">{this.state.alert_msg}</div>
                     <this.EmailTextField />
                     <button
                        onClick={this.Submit.bind(this)}
                        disabled={this.state.loading}
                     >
                        <AnimatePresence>
                           {this.state.loading ? <this.Loading /> : "Reset"}
                        </AnimatePresence>
                     </button>
                  </form>
               </div>
               <footer>
                  <p>
                     Remember It? <Link to="/login">Sign in</Link>
                  </p>
                  <p>
                     ©2020 Chatvia. Crafted with <span>&#10084;</span> by Ahmed
                     Arby
                  </p>
               </footer>
            </div>
         </div>
      );
   }
}

export default ForgetPasswordPage;
