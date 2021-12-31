const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");
const hbs = require("hbs");

const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// console.log(path.join(__dirname, '../public'));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
  res.render("register");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (reg, res) => {
  res.render("login");
});

// Create a new user in our database
app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerEmployee = new Register({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        age: req.body.age,
        password,
        confirmpassword: cpassword,
      });

      console.log("The success part" + registerEmployee);

      const token = await registerEmployee.generateAuthToken();
      console.log("The token part " + token);

      const registered = await registerEmployee.save();
      res.status(201).render("index");
    } else {
      res.send("password are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
    console.log("THe error part page");
  }
});

// login check
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Register.findOne({ email });
    res.send(useremail);
    // console.log(useremail);

    if (useremail.password === password) {
      res.status(201).render("index");
    } else {
      res.send("Invalid Login Details");
    }
  } catch (error) {
    res.status(400).send("Invalid Login Details");
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
