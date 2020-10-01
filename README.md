# :arrow_forward: Error Handler Middleware
## :heavy_check_mark: Project

Error handling is an essential routine when developing an application. When building endpoints of an API for example, it is necessary to make checks and return error messages to the user if they happen. However, dealing with these errors and responses for each verification of the entire application becomes laborious, and leaves the code more extensive and confusing.

This repository shows a simple implementantion of an **Error Handler Middleware** using **Node.js** with **express.js** framework, 
in order to alleviate the problem mentioned above.

## :rocket: Technologies
* Node.js
* Express.js
* EJS (but it is not necessary, there are other alternatives)

## :ballot_box_with_check: Using
Clone this repository:
```
$ git clone https://github.com/willygoncalves2000/error-handler-middleware-express.git
```
Go into the repository
```
$ cd error-handler-middleware-express
```
Run (port 3333)
```
npm start
```
## Explanation
First, is necessary to know what a Middleware is. In *Express.js*, Middlewares are functions that have access to *request* and *response*. They can execute any code, make changes to *requests* and *responses*, end the request-response cycle, call the next middleware. One point is important to highlight: a Middleware called first will also be executed first.

Note that the **Error Handler Middleware** is being defined after all other middleware (*app.use* and *route calls*).

In this simple application, a HTML page is render through de EJS (templating language that lets you generate HTML with JavaScript) when a GET request is made for the route "/". This page has a simple form with two input, onde for Username and one for Password. 

Simulating a login service, the application verify the credentials. This is done in the POST request for the route */login*, which receives the body of the request containing the username and password entered. 

To make understanding easier and more practical, no connection to a database is being made. Instead, the system just checks that the Username is "AdminUser" and the password is "admin123". If these credentials are valid, the User will receive a success message. If not. Otherwise will receive a error message, specifying what went wrong.
 
## Throwing error
Express.js identifies an Error Handler Middleware through a fourth argument contained in the function:
```
app.use((error, req, res, next) => {
  ...
})
```
To use Error Handler Middleware it is necessary to throw or create an Error. When an Error is created, we can define a *message* by passing in a string as a parameter. 

Look the follow code:
```
const error = new Error('Wrong Password!');
error.statusCode = 401;
throw error;
```
We are creating an Error and defining a *message* saying that the password entered is wrong. In the next line, we inform the status code related to this error. Finally, the error is thrown. 

The same effect is achieved by replacing **throw error** to **next(error)**. When using **next(error)** *Express* considers the current request to be in error and will ignore any remaining routing and middleware functions other than Error Handling.

In this moment, we are telling *Express.js* that this is an error, and you should go to the Error Handler. The Error Handler Middleware receive this Error, with your *code* and *message*. Then we send a *response* with this respective status and a JSON (JavaScript Object Notation) with the message, informing the user what is wrong.
```
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({
    message: message,
  })
})
```

Note that, if the error Status Code is not defined, it receives the Status Code 500 by default.