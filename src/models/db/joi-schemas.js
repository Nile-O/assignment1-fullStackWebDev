import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  export const StopSpec = {
    title: Joi.string().required(),
    locationlat: Joi.number().required(),
    locationlong: Joi.number().required(),
    description: Joi.string().allow("").optional(),
  };
  
  export const RouteSpec = {
    title: Joi.string().required(),
  };