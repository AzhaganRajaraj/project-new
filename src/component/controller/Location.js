import { useState } from "react";

export default function Location() {
    const[location, setLocation] =useState({
        name: "",
        code: "",
        city: "",
        state: ""
    });

    function handleChange(e) {
        setLocation({ ...location, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:9000/api/locations", {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body:JSON.stringify(location)
        }).then(res => res.json())
    }

    return (
        <div className="container">
            <h3 className="text-center">Location</h3>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter name" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Code</label>
                    <input type="text" className="form-control" id="code" name="code" placeholder="Enter code" onChange={handleChange} ></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" placeholder="Enter city" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input type="text" className="form-control" id="state" name="state" placeholder="Enter state" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>

            </form>
        </div>
    )
}