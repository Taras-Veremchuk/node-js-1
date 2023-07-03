const {
	getContactById,
	listContacts,
	removeContact,
	addContact,
} = require("./contacts");
const { Command } = require("commander");
const program = new Command();

program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			const allContacts = await listContacts();
			return console.table(allContacts);
		case "get":
			const oneContact = await getContactById(id);
			return console.log(oneContact);

		case "add":
			const newContact = await addContact({ name, email, phone });
			return console.log(newContact);

		case "remove":
			const deleteContact = await removeContact(id);
			return console.log(deleteContact);
		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}
invokeAction(options);
// node index.js --action="list"
// node index.js --action="get" --id 05olLMgyVQdWRwgKfg5J6
// node index.js --action="add" --name Mango --email mango@gmail.com --phone 322-22-22
// node index.js --action="remove" --id qdggE76Jtbfd9eWJHrssH
