const { client } = require("./client")

const database = client.db('showcase');
const dataCollection = database.collection('data');
const userCollection = database.collection('users')

module.exports = {dataCollection, userCollection};