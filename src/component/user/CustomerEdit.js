import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CustomerEdit() {
    const[customer, setCustomer] = useState({
        address: "",
        city: "",
        state: "",
        pincode: "",
    });
    const router = useNavigate();
    const { id } = useParams();
    const[users, setUsers] = useState([]);



   function getUsers() {
    const token = localStorage.getItem("token");
    fetch("http://localhost:9000/api/users/", {
        method: "GET",
        headers: {
            "content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        },
    }).then(res => res.json())
      .then(data => {
        setUsers(data)
      }).catch(err => console.log(err))
   }

   useEffect(() => {
     getUsers();
   },[])


    function handleChange(e) {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    }

    function handleUpdate(e) {
        e.preventDefault();

        const token = localStorage.getItem("token");
        console.log(token)
        console.log(customer)

        fetch(`http://localhost:9000/api/customers/${id}/`,{
            method: "PUT",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(customer)
        }).then(data => {  
            console.log(data)    
            router("/customers");
            })
    


    }

    return (
        <div className="container mt-4">
            <h2>Edit Customer</h2>

            <form onSubmit={handleUpdate}>

                <div className="mb-3 mt-3">
                    <label htmlFor="address" className="fotm-label">Address</label>
                <input  type="text" className="form-control mb-2" id="address" name="address" placeholder="Enter Address" onChange={handleChange} />
                </div>


                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                <input  type="text" className="form-control mb-2" id="city" name="city" placeholder="Enter City" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                <input  type="text" className="form-control mb-2" id="state" name="state" placeholder="Enter State" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="pincode" className="form-label">Pin Code</label>
                <input  type="text" className="form-control mb-2" id="pincode" name="pincode" placeholder="Enter Pincode" onChange={handleChange} />
                </div>

                <button  className="btn btn-success">Update</button>
            </form>
        </div>
    )
}