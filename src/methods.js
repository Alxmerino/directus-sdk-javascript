const { buildPath, performRequest } = require('./methods/base');
const { createItem, getItems, getItem, updateItem, deleteItem } = require('./methods/items');
const { getTables, getTable, createTable } = require('./methods/tables');

module.exports = {
  buildPath,
  performRequest,

  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,

  getTables,
  getTable,
  createTable
};
