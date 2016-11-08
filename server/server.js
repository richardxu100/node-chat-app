const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public'); // path.join() doesn't go into and then out of a directory, as just adding does
const port = process.env.PORT || 3000;
var app = express();

// use middleware with app.use()
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
