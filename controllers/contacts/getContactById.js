const { Contact } = require("../../models/contact")
const isValidObjectId = require("../../services/mongoIdValidation")
const { NotFound } = require('http-errors');

const getContactById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        //  const error = new Error(`Contact with ID "${contactId}" not found!`);
        //   error.status = 404;
        // throw error;
        throw new NotFound(`Contact with ID "${contactId}" not found!`)
        
    }
    const contactById = await Contact.findById(contactId);
    if (!contactById) {
        // const error = new Error(`Contact with ID "${contactId}" not found!`);
        // error.status = 404;
        // throw error;
        throw new NotFound(`Contact with ID "${contactId}" not found!`)
    }
    res.json({
        status: "success",
        code: 200,
        result: contactById,
      })
    } catch (error) {
        next(error);
    }
}

module.exports = getContactById;