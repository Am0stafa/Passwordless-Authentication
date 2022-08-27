const express = require("express");
const app = express();
const cors = require("cors");
const stytch = require("stytch");
const dotenv = require('dotenv')
dotenv.config();
const PORT =5001 
app.use(cors());
app.use(express.json());

const client = new stytch.Client({
    project_id:process.env.projectId,
    secret:process.env.secret,
    env:stytch.envs.test
})

//* what this will basically do
//! this will generate a link that will authenticate the user
app.post("/login", async (req, res) => {
    const email = req.body.email;
    const params = {
        email,
        //! when you login/signup we need to be redirected back to this url with a query of a token
        login_magic_link_url: "http://localhost:3000/auth",
        signup_magic_link_url: "http://localhost:3000/auth",
    }
    
    //^ it will do that by either login or creating a new user if the user is not in the stick database
    const response = await client.magicLinks.email.loginOrCreate(params);
    
    res.status(200).json(response) 
    
})

//! after getting redirected with the token in the query which is a onetime token used to authenticate the user so from the front end we will get that token send it to this route then call a function which will authenticate the user and create a session finally we will send back this session to be stored in a cookie and we will send this session to validate every single request and authenticate the request

app.post("/auth", async (req, res) => {
    try {
        const token = req.body.token;
        const sessionToken = await client.magicLinks.authenticate(token, {
            session_duration_minutes: 30,
        });
          res.json(sessionToken);

    } catch (err) {
        console.log(err)
        res.json(err);
    }

})

//! middleware that will authenticate the session
const authMiddleware = (req, res, next) => {
    const sessionToken = req.headers.sessiontoken;
    client.sessions
      .authenticate({ session_token: sessionToken })
      .then(() => {
        next();
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  };
  
app.post("/test", authMiddleware, (req, res) => {
    res.json("IT WORKED, THIS USER IS AUTHENTICATED");
});
  


app.listen(PORT,() => console.log(`http://localhost:${PORT}`));``