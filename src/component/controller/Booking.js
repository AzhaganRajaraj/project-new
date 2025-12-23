import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Booking() {
    const[booking, setBooking] = useState({
    
        schedule: "",
        customer: "",
        totalfare: "",
        status: "",
        bookingTime: ""
    });

    const[customer, setCustomer] = useState([]);
    const[schedule, setSchedule] = useState([]);

    const router = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:9000/api/customers/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
           .then(data => {
            console.log(data)
            setCustomer(data)
           })
    },[])

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:9000/api/locations/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            setSchedule(data)
          })
    },[])

    function handleChange(e) {
        setBooking({ ...booking, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        fetch("http://localhost:9000/api/bookings/", {
            method: "POST",
            headers: {
                "content-Type":"application/json",
                "Authoruzation":`Bearer ${token}`
            },
            body:JSON.stringify(booking)
        })
          .then(data => {
            console.log(data)
            router("/payments")
          }).catch(err => console.log(err))
    }

    return (
        <div className="container">
            <h3 className="text-center">Booking</h3>
            <form onSubmit={handleSubmit} >


                <div className="mb-3">
                    <label htmlFor="customer" className="form-label">Customer</label>
                    <select className="form-control" id="customer" name="customer" onChange={handleChange}>
                           <option>Choose Customer Name</option>
                           {
                            customer.map((val) => 
                            <option value={val.id}>{val.user?.fullName}</option> )
                           }
                           </select>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="schedule" className="form-label">Schedule</label>
                    <select className="form-control" id="schedule" name="schedule" onChange={handleChange}>
                        <option>Destination</option>
                        {
                            schedule.map((val) => 
                                <option value={val.id}>{val.city} to {val.state}</option>
                            )
                        }
                    </select>
                </div>


                <div className="mb-3">
                    <label htmlFor="status" className="form-label">status</label>
                    <select className="form-control" id="status" name="status" onChange={handleChange}>
                        <option value="">Payment Status</option>
                        <option value="SUCCESS">Success</option>
                        <option value="PENDING">Pending</option>
                        <option value="FAILED">Failed</option>
                        <option value="REFUNDED">Refunded</option>
                    </select>
                </div>
    
                <div className="mb-3">
                    <label htmlFor="bookingTime" className="form-label">Booking Time</label>
                    <input type="text" className="form-control" id="bookingTime" name="bookingTime" placeholder="select Booking Time " onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="totalfare" className="form-label">Total Fare</label>
                    <input type="text" className="form-control" id="totalfare" name="totalfare" placeholder="Enter total fare" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}