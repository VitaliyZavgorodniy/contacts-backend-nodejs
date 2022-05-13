const createError = require("http-errors");
const jwt = require("jsonwebtoken");

const { usersService } = require("../services");

const { SECRET_KEY } = process.env;
const service = new usersService();

const validationToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") throw createError(401);

    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await service.findUser({ _id: id });

    console.log(id);
    console.log(user);

    if (!user) throw createError(401);
    req.user = user;

    next();
  } catch (err) {
    if (err.message === "Invalid signature") err.status === 401;

    next(err);
  }
};

module.exports = validationToken;
