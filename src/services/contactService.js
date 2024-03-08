const contactModel = require('../models/contactModel')

class contactService {
    // register a user
    async createContact(contact) {
        return await contactModel.create(contact)
    }
}

module.exports = new contactService()