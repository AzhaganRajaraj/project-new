import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Coach() {
    const [coach, setCoach] = useState({
        coachName: "",
        coachType: "",
        totalSeats: "",
        scheduleId: "",
        trainId: ""

    });


    function handleChange(e) {
        setCoach({ ...coach, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const trainId  = localStorage.getItem("trainId");
        const token = localStorage.getItem("token");
        fetch("http://localhost:9000/api/coaches/", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization":`Bearer ${token}`
            },
            body: JSON.stringify({
                coachName: coach.coachName,
                coachType: coach.coachType,
                totalSeats: coach.totalSeats,
                train: { id: trainId }  
            })

         })
}

return (
    <div className="container">
        <h2 className="text-center">Coach</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="coachName" className="form-label">Coach Name</label>
                <input type="text" className="form-control" id="coachName" name="coachName" placeholder="Coach Name" onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="coachType" className="form-label">Coach Type</label>
                <input type="text" className="form-control" id="coachType" name="coachType" placeholder="Coach Type" onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="totalSeat" className="form-label">Total Seats</label>
                <input type="text" className="form-control" id="totalSeats" name="totalSeats" placeholder="Total Seats" onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="scheduleId" className="form-label">schedule ID</label>
                <input type="text" className="form-control" id="scheduleId" name="scheduleId" placeholder="Schedule ID" onChange={handleChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="trainId" className="form-label">Train ID</label>
                <input type="text" className="form-control" id="trainId" name="trainId" placeholder="train ID" onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-success">Submit</button>
        </form>
    </div>
)
}