const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// Sample data (replace with your own data source or database)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' }
];

// Route for displaying all items
app.get('/', (req, res) => {
  res.render('index', { items });
});

// Route for displaying a single item
app.get('/item/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  res.render('item', { item });
});

// Route for creating a new item (display form)
app.get('/item/new', (req, res) => {
  res.render('new');
});

// Route for handling the form submission (create new item)
app.post('/item', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name
  };
  items.push(newItem);
  res.redirect('/');
});

// Route for editing an existing item (display form)
app.get('/item/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  res.render('edit', { item });
});

// Route for handling the form submission (update item)
app.post('/item/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(item => item.id === id);
  item.name = req.body.name;
  res.redirect('/');
});

// Route for deleting an item
app.get('/item/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(item => item.id !== id);
  res.redirect('/');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
