import { useState } from "react";

export default function Payment() {
    const[payment, setPayment] = useState({
        bookingId: "",
        amount: "",
        paidTime: "",
        transactionId: "",
        status: "",
        customerId: ""

    });

    function handleChange(e) {
        setPayment({ ...payment, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:9000/api/payments/", {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body:JSON.stringify(payment)
        })
    }

    return (
        <div className="container">
            <h3 className="text-center">Payment</h3>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="bookingId" className="form-label">Booking ID</label>
                    <input type="text" className="form-control" id="bookingId" name="bookingId" placeholder="Enter booking id" onChange={handleChange} />
                </div>


                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Paid Time</label>
                    <input type="text" className="form-control" id="amount" name="amount" placeholder="Enter amount" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">transaction ID</label>
                    <input type="text" className="form-control" id="amount" name="amount" placeholder="Enter amount" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Customer ID</label>
                    <input type="text" className="form-control" id="amount" name="amount" placeholder="Enter amount" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Status</label>
                    <input type="text" className="form-control" id="amount" name="amount" placeholder="Enter amount" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input type="text" className="form-control" id="amount" name="amount" placeholder="Enter amount" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success">Pay</button>
            </form>
        </div>
    )
}