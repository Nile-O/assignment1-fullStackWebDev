import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

  export const StopSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Roncesvalles"),
    locationlat: Joi.number().required().example(43.0092),
    locationlong: Joi.number().required().example(1.3195),
    description: Joi.string().allow("").optional().example("Lovely town very hospitable"),
    routeid: IdSpec,
  })
  .label("Stop");

export const StopSpecPlus = StopSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("StopPlus");

export const StopArraySpec = Joi.array().items(StopSpecPlus).label("StopArray");

  
export const RouteSpec = Joi.object()
.keys({
  title: Joi.string().required().example("Camino Frances"),
  userid: IdSpec,
  stops: StopArraySpec,
})
.label("Route");

export const RouteSpecPlus = RouteSpec.keys({
_id: IdSpec,
__v: Joi.number(),
}).label("RoutePlus");

export const RouteArraySpec = Joi.array().items(RouteSpecPlus).label("RouteArray");
