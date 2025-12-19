    import { useState } from "react";
import { useNavigate } from "react-router-dom";

    export default function Seats() {
        const[seat, setSeat] = useState({
            seatNumber: "",
            trainId: ""
        });

        const router = useNavigate();

        function handleChange(e) {
            setSeat({ ...seat, [e.target.name]: e.target.value});
        }

        function handleSubmit(e) {
            e.preventDefault();
            const token = localStorage.getItem("token");
            const coachId = localStorage.getItem("coachId")
            fetch("http://localhost:9000/api/seats/", {
                method: "POST",
                headers: {
                    "content-type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify({
                    seatNumber: seat.seatNumber,
                    coach: { id: coachId}
                })
            })
            .then(data => {
                console.log(data)
            })
        }


        return (
            <div className="container">
                <h3 className="text-center">Seats</h3>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="seatNumber" className="form-label">Seat Number</label>
                        <input type="text" className="form-control" id="seatNumber" name="seatNumber" placeholder="Seat Number" onChange={handleChange} />
                    </div>


                    <button type="submit" className="btn btn-success">submit</button>
                </form>

            </div>
        )

    }