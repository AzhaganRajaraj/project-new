import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCustomer() {
    const[add, setAdd] = useState({
        fullname: "",
        email: "",
        password: "",
        address: ""
    });
    const router = useNavigate();

    function handleChange(e) {
        setAdd({ ...add, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://localhost:9000/api/customers/",{
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body:JSON.stringify(add)
        })
        .then(()=> {
            alert("customer added successfully");
            router("/customer-list");
        })
    }

    return (
        <div className="container">
            <h1 className="text-center">Add Customer</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="fullname" className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="fullname" id="fullname" placeholder="Enter the name" onChange={handleChange} />
                </div> 

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control"
                    name="email" id="email" placeholder="Enter email" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="pwd" className="form-label">Password</label>
                    <input type="password" className="form-control" id="pwd" name="password" placeholder="Enter password" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="address" placeholder="Enter Address" onChange={handleChange} />
                </div>

                <button className="btn btn-outline-primary m2-2">Add User</button>
            </form>
        </div>
    )
}