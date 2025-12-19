import { useState } from "react";

export default function Booking() {
    const[booking, setBooking] = useState({
        userId: "",
        scheduleId: "",
        customerId: "",
        totalFare: "",
        bookingTime: ""
    });

    function handleChange(e) {
        setBooking({ ...booking, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        fetch("http://localhost:9000/api/bookings/", {
            method: "POST",
            headers: {
                "content-type":"application/json",
                "Authoruzation":`Bearer ${token}`
            },
            body:JSON.stringify(booking)
        })
          .then(data => {
            console.log(data)
          })
    }

    return (
        <div className="container">
            <h3 className="text-center">Booking</h3>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">User ID</label>
                    <input type="text" className="form-control" id="userId" name="userId" placeholder="Enter user Id" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="scheduleId" className="form-label">Schedule ID</label>
                    <input type="text" className="form-control" id="scheduleId" name="scheduleId" placeholder="Enter schedule Id" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="customerId" className="form-label">Customer ID</label>
                    <input type="text" className="form-control" id="customerId" name="customerId" placeholder="Enter customer Id" onChange={handleChange} />
                </div>
    
                <div className="mb-3">
                    <label htmlFor="bookingTime" className="form-label">Booking Time</label>
                    <input type="text" className="form-control" id="bookingTime" name="bookingTime" placeholder="select Booking Time " onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="totalFare" className="form-label">Total Fare</label>
                    <input type="number" className="form-control" id="totalFare" name="totalFare" placeholder="Enter total fare" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}