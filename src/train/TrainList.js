import { useEffect, useState } from "react";
import Coach from "../component/controller/Coach";

export default function TrainList() {
    const[train, setTrain] = useState([]);

    useEffect(() =>{
        loadTrain();
    },[])




    function loadTrain() {
        const token = localStorage.getItem("token")
        console.log(token)
        fetch("http://localhost:9000/api/trains/", {
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
            setTrain(data)
        })
        .catch(err => console.log(err))

    }


    return (
        <div className="container">
            <h3 className="text-center">Train - Coach - Seat Details</h3>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Train No</th>
                        <th>Train Name</th>
                        <th>Type</th>
                        <th>Total Coaches</th>
                        <th>Coach Name</th>
                        <th>Coach Type</th>
                        <th>Total Seats</th>
                        <th>Seat Number</th>
                    </tr>
                </thead>
                <tbody>
                    {train.map(t => 
                        t.coaches.map(c =>
                            c.coach.seats.map(s => (
                                <tr key={`${t.id}-${c.id}-${s.id}`}>
                                    <td>{t.number}</td>
                                    <td>{t.name}</td>
                                    <td>{t.type}</td>
                                    <td>{t.totalCoaches}</td>
                                    <td>{c.coachName}</td>
                                    <td>{c.coachType}</td>
                                    <td>{c.totalSeats}</td>
                                    <td>{s.seatNumber}</td>
                                </tr>
                            ))
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}

