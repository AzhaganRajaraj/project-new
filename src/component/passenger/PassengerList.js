import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PassengerList() {
    const[passenger, setPassenger] = useState([]);

    const router = useNavigate();

    useEffect(() => {
        loadPassengers();
    },[])

    function loadPassengers() {
        const token = localStorage.getItem("token")
        console.log(token)
        fetch("http://localhost:9000/api/passengers/", {
            method: "GET",
            headers: {
                "Authorization":`Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) throw new Error("403 Forbidden");
            return res.json();
        })
        .then(data => {
            console.log(data)
            setPassenger(data)
        })
        .catch(err=>console.log(err))
    }

    function handleView(id) {
        router(`/passenger/view/${id}`)

    }

    function handleEdit(id) {
        router(`/passenger/edit/${id}`)

    }

    function handleDelete(id) {
        if (window.confirm("Delete the Passenger!")) {
            fetch(`http://localhost:9000/api/passengers/${id}`, {
                method: "DELETE",
                headers: {
                    "content-Type":"application/json",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            }).then(() => loadPassengers());
        }

    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between">
                <h2 className="text-center">Passengers Details</h2>
                <a href="/passenger/create" className="btn btn-info">Add Passenger</a>
            </div>
            <table className="table table-bordered table-striped mt-3">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>customerID</th>
                        
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {passenger?.map(p =>  
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td>{p.gender}</td>
                        <td>{p.age}</td>
                        <td>{p.customeid}</td>
                        <td>
                            <button className="btn btn-outline-success me-2" onClick={() => handleView(p.id)}>View</button>

                            <button className="btn btn-outline-warning me-2" onClick={() => handleEdit(p.id)}>Edit</button>

                            <button className="btn btn-outline-danger me-2" onClick={() => handleDelete(p.id)}>Delete</button>
                        </td>
                    </tr>

                    )}
                </tbody>
            </table>
        </div>
    )
}