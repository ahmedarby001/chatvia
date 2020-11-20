import Firebase from 'firebase/app';
import FirebaseApp from './index';
import 'firebase/auth';


export const TwitterProvider = new Firebase.auth.TwitterAuthProvider();
export const GoogleProvider = new Firebase.auth.GoogleAuthProvider();
export const FacebookProvider = new Firebase.auth.FacebookAuthProvider();

export default FirebaseApp.auth();
