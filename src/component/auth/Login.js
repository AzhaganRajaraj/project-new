import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [auth, setAuth] = useState({});
    const router = useNavigate()

    function handleChange(e) {
        setAuth({ ...auth, [e.target.name]: e.target.value })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(auth)
        fetch("http://localhost:9000/api/auth/login",{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(auth)
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            localStorage.setItem("token",data.token)
            router("/")
        }) 
    }
    return (
        <div className="container">
            <h1 className="text-center"> Login Page</h1>
        <form onSubmit={handleSubmit}>
            <div class="mb-3 mt-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label for="pwd" class="form-label">Password:</label>
                <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="password" onChange={handleChange}/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}