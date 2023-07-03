const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
	try {
		const buffer = await fs.readFile(contactsPath);
		return JSON.parse(buffer);
	} catch (err) {
		console.error(err.message);
	}
}
async function getContactById(contactId) {
	try {
		const contacts = await listContacts();
		const contact = contacts.find((item) => item.id === contactId);
		return console.log(contact || null);
	} catch (err) {
		console.error(err.message);
	}
}
async function removeContact(contactId) {
	try {
		const contacts = await listContacts();
		const index = contacts.findIndex((item) => item.id === contactId);
		if (index === -1) {
			return null;
		}
		const [contact] = contacts.splice(index, 1);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return contact;
	} catch (err) {
		console.error(err.message);
	}
}
async function addContact(data) {
	try {
		const contacts = await listContacts();
		const contact = {
			id: nanoid(),
			...data,
		};
		contacts.push(contact);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return contact || null;
	} catch (err) {
		console.error(err.message);
	}
}

module.exports = {
	removeContact,
	getContactById,
	listContacts,
	addContact,
};
