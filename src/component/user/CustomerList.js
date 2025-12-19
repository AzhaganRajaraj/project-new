import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerList() {
    const[data, setList] = useState([]);

    const router = useNavigate();

    useEffect(() => {
        loadCustomers();
    },[])

    function loadCustomers() {
        const token = localStorage.getItem("token")
        console.log(token)
        fetch("http://localhost:9000/api/customers/",{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token} `
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setList(data)})
        .catch(err=>console.log(err))

    }
    function handleDelete(id) {
        if (window.confirm("Delete this customer?")) {
            fetch(`http://localhost:9000/api/customers/${id}`,{
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
                
             }).then(() => loadCustomers());
        }

    }

    function handleEdit(id) {
        router(`/customer/edit/${id}`)

    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between">
            <h2 className="text-center">Customer Details</h2>
            <a href="/customer/create" className="btn btn-primary">Add Customer</a>
            </div>
            <table className="table table-bordered table-striped mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(c => 
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.user?.fullName}</td>
                            <td>{c.user?.email}</td>
                            <td>{c.address}</td>
                            <td>
                                <button className="btn btn-outline-warning btn-sm me-2" onClick={() => handleEdit(c.id)}>Edit</button>
                                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(c.id)} >Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
} 