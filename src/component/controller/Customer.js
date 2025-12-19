import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Customer() {
    const [customer, setCustomer] =useState({
        address: "",
        city: "",
        state: "",
        pincode: "",
        userId: ""
    });
    const [users,setUsers] = useState([])
    const router = useNavigate();

    const updatedCustomer = {
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
        user: {id: customer.userId}
    };

    function getUsers(){
        const token = localStorage.getItem("token");
        fetch("http://localhost:9000/api/users/",{
            method: "GET",
            headers: {
                "content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },}).then(res => res.json())
        .then(data=>{
            setUsers(data)
        }).catch(err => console.log(err))
    }

    useEffect(()=>{
        getUsers();
},[])

    function handleChange(e) {
        setCustomer({ ...customer, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token")
        console.log(customer)
        fetch("http://localhost:9000/api/customers/", {
            method: "POST",
            headers: {
                "content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(updatedCustomer)
        })
        .then(data => {
            console.log(data)
            router("/customers")
        })

    }
    return (
        <div className="container">
            <h1 className="text-center">Customer Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="address" className="form-lable">Address</label>
                    <input type="text" className="form-control" id="address" name="address" placeholder="Enter address" onChange={handleChange} />
                </div>

                 <div className="mb-3 mt-3">
                    <label htmlFor="userId" className="form-lable" name="userId">User</label>
                    <select  name="userId" onChange={handleChange}>
                        <option>choose user</option>
                        {
                            users?.map((val)=> (
                                <option value={(val.id)}>{val.fullName}</option>
                            ))
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" name="city" placeholder="Enter city" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input type="text" className="form-control" id="state"
                     name="state" placeholder="Enter state" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="pincode" className="form-label">Pincode</label>
                    <input type="number" className="form-control" id="pincode" name="pincode" placeholder="
                     Enter pincode" onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-outline-primary ms-2">Submit</button>
            </form>
        </div>
    )
}