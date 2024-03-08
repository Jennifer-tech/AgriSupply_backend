const contactService = require("../services/contactService");

exports.createContact = async (req, res) => {
    
    try {
        const contactInfo = req.body;
        console.log("contactInfo", contactInfo)

        const contactData = await contactService.createContact(contactInfo)
        console.log("contactData", contactData)
        return res.status(200).json({
            success: true,
            data: contactData,
            message: "Response received"
        })

    } catch (error) {
        res.status(500).json({ Success: false, message: error.message })
        // throw new Error(error)
    }
};