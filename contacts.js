const fs = require("fs").promises;
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts.filter((contact) => contact.id === contactId);
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const newContent = JSON.parse(data).filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContent), "utf-8");
    return newContent;
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContent = {
      id: `${uid()}`,
      name,
      email,
      phone,
    };
    contacts.push(newContent);

    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
    return contacts;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
