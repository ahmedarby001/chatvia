import Firebase from "firebase/app";
import FirebaseApp from "./index";
import "firebase/auth";

enum ERRORS {
   EMAIL_EXISTS = "auth/email-already-exists",
   INTERNET = "auth/internal-error",
   INVALID_EMAIL = "auth/invalid-email",
   INVALID_PASSWORD = "auth/invalid-password",
   INVALID_PHOTO_URL = "auth/invalid-photo-url",
   USER_NOT_FOUND = "auth/user-not-found",
}

export const auth = FirebaseApp.auth();

export class Authentication {
   constructor() {
      this.SendPasswordResetEmail = this.SendPasswordResetEmail.bind(this);
   }

   TwitterProvider = new Firebase.auth.TwitterAuthProvider();
   GoogleProvider = new Firebase.auth.GoogleAuthProvider();
   FacebookProvider = new Firebase.auth.FacebookAuthProvider();

   private $ResolveError(err: {
      a: any;
      code: string;
      message: string;
   }): string {
      switch (err.code) {
         case ERRORS.EMAIL_EXISTS:
            return "There account with this E-mail";
         case ERRORS.INTERNET:
            return "Internet connection error";
         case ERRORS.INVALID_EMAIL:
            return "This E-mail is not valid";
         case ERRORS.INVALID_PASSWORD:
            return "It must contain at least 6 characters";
         case ERRORS.INVALID_PHOTO_URL:
            return "This Photo url is not valid";
         case ERRORS.USER_NOT_FOUND:
            return "This user not found";
         default:
            return err.message;
      }
   }

   async SendPasswordResetEmail(
      email: string,
      onSuccess: Function,
      onError: Function
   ) {
      try {
         const res = await auth.sendPasswordResetEmail(email);
         onSuccess(res);
      } catch (error) {
         onError(this.$ResolveError(error));
      }
   }

   async SignIn(
      email: string,
      password: string,
      onSuccess: Function,
      onError: Function
   ) {
      try {
         const res = await auth.signInWithEmailAndPassword(email, password);
         onSuccess(res);
      } catch (error) {
         const msg = this.$ResolveError(error);
         if (
            msg === ERRORS.INVALID_EMAIL ||
            msg === ERRORS.USER_NOT_FOUND ||
            msg === ERRORS.INTERNET
         ) {
            onError({ email_err: msg });
         } else if (msg === ERRORS.INVALID_PASSWORD) {
            onError({ pass_err: msg });
         }
      }
   }
}

export default new Authentication();
