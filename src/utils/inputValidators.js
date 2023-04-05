/** 

@typedef {Object} ValidationObject
* @property {boolean} isValid -  wether field is valid or not
* @property {boolean} message -  if field is invalid then message stating reason of invalidity. if field is valid this property will be an empty string 

*/

/**
 * @typedef {Object} SignupDetails
 * @property {String} name  
 * @property {String} email
 * @property {String} password
 */



/**
 * @typedef {Object} LoginDetails
 * @property {String} email
 * @property {String} password
 */

import Joi from "joi";


/**
 * 
 * @param {String} name 
 *  @return {ValidationObject}
 *
 */
export function validateName(name) {
    if (name.trim().length < 1) {
        return {
            "isValid": false,
            "message": "name field is required"
        }
    }
    return {
        "isValid": true,
        "message": ""
    }
}


/**
 * 
 * @param {String} email
 *  @returns  {ValidationObject} 
 *
 */
export function validateEmail(email) {
    const emailregex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, "g");
    if (email.trim().length < 1) {
        return {
            "isValid": false,
            "message": "email field is required"
        }
    }
    if (!emailregex.test(email)) {
        return {
            "isValid": false,
            "message": "Invalid email"
        }
    }
    return {
        "isValid": true,
        "message": ""
    }
}

/**
 * 
 * @param {String} password
 *  @returns {ValidationObject}
 *
 */
export function validatePassword(password) {
    const passwordRegex = new RegExp(/[a-z1-9]{4,}/, "g");
    if (password.trim().length < 1) {
        return {
            "isValid": false,
            "message": "password field is required"
        }
    }
    if (!passwordRegex.test(password)) {
        return {
            "isValid": false,
            "message": "enter password of atlease  6 non special characters"
        }
    }
    return {
        "isValid": true,
        "message": ""
    }
}



/**
 * 
 * @param {SignupDetails} user
 *  @returns {ValidationObject}
 *
 */
export function validateSignupDetails(user) {
    const schema = Joi.object({
        "name":Joi.string().min(3).required(),
        "email":Joi.string().email().required(),
        "password":Joi.string().min(6).required()
        
    });
    if (schema.validate(user).error) {
        return {
            "isValid": false,
            "message": schema.validate(order).error.message
        }
    }

    return {
        "isValid": true,
        "message": ""
    }

}




/**
 * 
 * @param {LoginDetails} user
 *  @returns {ValidationObject}
 *
 */
export function validateLoginDetails(user) {
    const schema = Joi.object({
        "email":Joi.string().email().required(),
        "password":Joi.string().min(6).required()
        
    });
    if (schema.validate(user).error) {
        return {
            "isValid": false,
            "message": schema.validate(order).error.message
        }
    }

    return {
        "isValid": true,
        "message": ""
    }

}






