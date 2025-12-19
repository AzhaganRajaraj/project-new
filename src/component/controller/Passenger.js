import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Passenger() {
    const [passenger, setPassenger] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        customerid: "",
        documentType: "",
        documentNumber: ""

    });

    const router = useNavigate();

    function handleChange(e) {
        setPassenger({ ...passenger, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token")
        console.log(passenger)
        fetch("http://localhost:9000/api/passengers/", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ passenger })
        }).then(data => {
            console.log(data)
            router("/passengers")

        }
        )
    }

    return (
        <div className="container">
            <h3 className="text-center">Passenger Details</h3>
            <form onSubmit={handleSubmit} >
                <div className="mb-3 mt-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" placeholder="Enter first name" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Enter last name" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="text" className="form-control" id="age" placeholder="Enter age" name="age" onChange={handleChange} />
                </div>


                <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select className="form-control" id="gender" name="gender" onChange={handleChange}>
                        <option value="">Select gender</option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                        <option value="OTHER">OTHER</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="customerid" className="form-label">customerID</label>
                    <input type="text" className="form-control" id="customerid" placeholder="Enter Customerid" name="customerid" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="documentType" className="form-label">Document Type</label>
                    <select className="form-control" id="documentType" name="documentType" onChange={handleChange}>
                        <option value="">Select Document</option>
                        <option value="AADHAR CARD">AADHAR CARD</option>
                        <option value="PAN CARD">PAN CARD</option>
                        <option value="DRIVING LICENCE">DRIVING LICENCE</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="documentNumber" className="form-label">Document Number</label>
                    <input type="text" className="form-control" id="documentNumber" placeholder="document number" name="documentNumber" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success">Update</button>

            </form>
        </div>
    )
}
