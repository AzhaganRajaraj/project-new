import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PassengerView() {
    const [passenger, setPassenger] = useState([]);

    const router = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        loadPassengers();
    }, [])


    function loadPassengers() {
        const token = localStorage.getItem("token")
        fetch(`http://localhost:9000/api/passengers/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setPassenger(data)
            })
    }

    function handleClick() {
        router("/passengers")
    }
    if (!passenger) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow p-4 ">
                        <h4 className="text-center">Passenger Details</h4>
                        <p><b>First Name:</b>{passenger.firstname}</p>
                        <p><b>Last Name:</b>{passenger.lastname}</p>
                        <p><b>Age:</b>{passenger.age}</p>
                        <p><b>Gender:</b>{passenger.gender}</p>
                        <p><b>CustomerID:</b>{passenger.customerId}</p>
                        <p><b>Document Type:</b>{passenger.documenttype}</p>
                        <p><b>Document Number:</b>{passenger.documentnumber}</p>

                        <button className="btn btn-info" onClick={() => handleClick()}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    )
}