import {  useEffect, useState } from "react";

export default function Payment() {
    const[payment, setPayment] = useState({
        bookingId: "",
        amount: "",
         paidTime: "",
        transactionId: "",
        status: ""

    });

    const[booking, setBooking] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("http://localhost:9000/api/bookings/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            setBooking(data)
          })
          .catch(err => console.log(err))
    },[])


    function handleChange(e) {
        setPayment({ ...payment, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        const token = localStorage.getItem("token");
        e.preventDefault();
        fetch("http://localhost:9000/api/payments/", {
            method: "POST",
            headers: {
                "content-type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(payment)
        })
        .then(data => {
            console.log(data)
        }).catch(err => console.log(err))
    }

    return (
        <div className="container">
            <h3 className="text-center">Payment</h3>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="bookingId" className="form-label">Booking ID</label>
                    <select className="form-control" id="bookingId" name="bookingId"onChange={handleChange}>
                        <option>Choose ID</option>
                        {
                            booking.map((val) =>
                                  <option value={val.id}>{val.id}</option>)
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="transactionId" className="form-label">transaction ID</label>
                    <input type="text" className="form-control" id="transactionId" name="transactionId" placeholder="Enter transactionId" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <input type="text" className="form-control" id="status" name="status" placeholder="Status" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="text" className="form-control" id="amount" name="amount" placeholder="Enter amount" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success">Save</button>
            </form>
        </div>
    )
}