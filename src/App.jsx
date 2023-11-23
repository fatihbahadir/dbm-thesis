import axios from "axios"
import { useEffect } from "react"

function App() {
  const authenticate = () => {
    axios.post("http://192.168.203.26:8080/api/v1/auth/authenticate", {
      email:'hunkerhyme@gmail.com',
      password: '5678',
    }).then((response)=>{
      console.log(response)
    })
    .catch((err)=>{
      console.error(err)
    })
  }
  return (
    <div>
        <button onClick={authenticate}>
          authenticate
        </button>
    </div>
  )
}

export default App
