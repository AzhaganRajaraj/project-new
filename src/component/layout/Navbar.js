import React, { useEffect, useState } from "react";

export default function Navbar() {
    const [token,setToken] = useState(null)
    useEffect(()=>{
        const token = localStorage.getItem("token")
        console.log(token)
        setToken(token)
    },[])

    function logout(){
        localStorage.removeItem("token")
        window.location.reload()
    }
    return (
        <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="javascript:void(0)">Logo</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="mynavbar">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="/customers">Customer</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/passengers">Passenger</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/schedule">Train Booking</a>
                        </li>
                    </ul>
                    <div class="d-flex">
                        {
                            token? <button className="btn btn-primary" onClick={logout}>Logout</button>:<>
                                <a href="/register" className="btn btn-primary">Register</a>
                                <a href="/login" class="btn btn-outline-primary ms-2">Login</a>
                            </>
                        }
                        
                    </div>
                </div>
            </div>
        </nav>

    );
}