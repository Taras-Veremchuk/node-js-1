const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function listContacts() {
	const buffer = await fs.readFile(contactsPath);
	return JSON.parse(buffer);
}
async function getContactById(contactId) {
	const contacts = await listContacts();
	const contact = contacts.find((item) => item.id === contactId);
	return console.log(contact || null);
}
async function removeContact(contactId) {
	const contacts = await listContacts();
	const index = contacts.findIndex((item) => item.id === contactId);
	if (index === -1) {
		return null;
	}
	const [contact] = contacts.splice(index, 1);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contact;
}
async function addContact(data) {
	const contacts = await listContacts();
	const contact = {
		id: nanoid(),
		...data,
	};
	contacts.push(contact);
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
	return contact || null;
}

module.exports = {
	removeContact,
	getContactById,
	listContacts,
	addContact,
};
