
import React from 'react';
import CryptoJS from 'crypto-js';


  const hashText=(password: string | CryptoJS.lib.WordArray)=>{
    const hashedPassword=CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
    return hashedPassword;
  };

  export default hashText;


