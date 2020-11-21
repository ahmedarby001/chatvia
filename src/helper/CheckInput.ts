const EMAIL_REG = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function CheckEmail(email: string) {
   const Result = {
      right: true,
      errMSG: ''
   }

   if(email.length === 0) {
      Result.right = false;
      Result.errMSG = 'Please enter your E-mail';
   } else if(!EMAIL_REG.test(email)) {
      Result.right = false;
      Result.errMSG = 'Please enter valid E-mail';
   }

   return Result;
}


export function CheckPassword(pass: string) {
   const Result = {
      right: true,
      errMSG: ''
   }

   if(pass.length === 0) {
      Result.right = false;
      Result.errMSG = 'Please enter your password';
   } else if(pass.length < 6) {
      Result.right = false;
      Result.errMSG = 'This too week password';
   }

   return Result;
}