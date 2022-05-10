const createError = require("http-errors");
const Joi = require("joi");

const contactsOperations = require("../../models/contacts");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const add = async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }

    const { name, email, phone } = req.body;

    const result = await contactsOperations.addContact(name, email, phone);
    res.status(201).json({ status: "success", code: 201, data: { result } });
  } catch (err) {
    next(err);
  }
};

module.exports = add;
