import React,{useState} from 'react'
import Axios from 'axios'

const Login = () => {

const [email,setEmail] = useState('')
const login =async() => {
  try {
    const res = await Axios.post("http://localhost:5001/login", { email })
    
    console.log("ok")

  } catch (error) {
    console.log(error)
  }
}
  return (
    <div className="formContainer">
      <div className="title">
        <h1> Sign Up</h1>
      </div>
      <div className="body">
        <p> Enter your email to login up.</p>
        <input type="email"
              placeholder="Enter your Email"
              onChange={(e)=> setEmail(e.target.value)}
        />
        <button onClick={login}> Login </button>      
      </div>
    </div>
  )
}

export default Login