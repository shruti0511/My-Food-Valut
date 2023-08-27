var validator = require("email-validator");

module.exports.SignUpValidation = (
    firstName,
    lastName,
    email,
    password,
    confirmPassword
) =>{
    let error

    if(email == '' || firstName == ''|| lastName == '' || password == ''){
        error = "All fields are Required"
    }  
    else if(!validator.validate(email)){
        error = "Email is not Valid"
    }    
    else if(confirmPassword !== password){
        error = "Password not match."
    }    
   
    
    return {
        error,
        valid: !error
    }
}

module.exports.SignInValidation = (
    email,
    password
) =>{
    let error

    if(email == ''){
        error.email = "Email is Required"
    }    
    else if(password == ''){
        error.password = "Password is Required"
    }    
    
    return {
        error,
        valid: !error
    }
}