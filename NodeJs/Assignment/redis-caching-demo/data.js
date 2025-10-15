// data.js
let items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" },
];

module.exports = {
  getItems: () => items,
  addItem: (item) => items.push(item),
  updateItem: (id, updatedItem) => {
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) items[index] = { ...items[index], ...updatedItem };
  },
  deleteItem: (id) => {
    items = items.filter(i => i.id !== id);
  }
};
