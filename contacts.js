const fs = require("fs").promises;
const { table } = require("console");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const dataJson = await fs.readFile(contactsPath, "utf8");
    const data = JSON.parse(dataJson);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(id) {
  try {
    const contacts = await listContacts();
    const filter = await contacts.filter(
      (contacts) => contacts.id === String(id)
    );
    console.log(filter);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(id) {
  try {
    const contacts = await listContacts();
    const filter = contacts.filter((contacts) => contacts.id !== String(id));
    const filterJson = JSON.stringify(filter);
    await fs.writeFile(contactsPath, filterJson, "utf8");
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const contactCard = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contacts.push(contactCard);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
