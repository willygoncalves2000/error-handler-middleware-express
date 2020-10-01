const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3333;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src','views'));

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", (req,res) => {
  res.render('home')
});


app.post("/login", (req,res,next) => {
  const user = req.body.user;
  const pass = req.body.pass;

  if (user !== 'AdminUser') {
    const error = new Error('A user with this Username could not be found!');
    error.statusCode = 401;
    throw error;
  } else if (pass !== 'admin123') {
    const error = new Error('Wrong Password!');
    error.statusCode = 401;
    next(error);
  } else {
    res.send("Successfully logged in!");
  }

})

app.get("*", (req,res) => {
  const error = new Error('Page not found!');
  error.statusCode = 404;
  throw error;
});

/* ------- ERROR HANDLER MIDDLEWARE --------*/
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.render('error', {
    errorMessage: message,
  });
  /*   res.status(status).json({
    message: message,
  }) */
})
/* ---------------------------------------- */

app.listen(port, () => {
  console.log(`Listening at port ${port}`)
})