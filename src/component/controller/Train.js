import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Trian() {
    const[data, setData] = useState({
        number: "",
        name: "",
        type: "EXPRESS",
        totalCoaches: ""

    });

    const router = useNavigate();

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        console.log(data);
        fetch("http://localhost:9000/api/trains/", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(data)
        })
          .then(train => {
            localStorage.setItem("trainId", train.id);
             router("/schedule")
          }).catch(err =>console.log(err))
       
    }

    return (
        <div className="container">
            <h3 className="text-center">Train</h3>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="number" className="form-label">Train Number</label>
                    <input type="text" className="form-control" id="number" placeholder="Enter Train number"name="number" onChange={handleChange} />

                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Train Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Train Name" name="name" onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Train Type</label>
                    <select className="form-control" id="type" name="type" value={data.type} onChange={handleChange}>
                        <option value="">SELECT TYPE</option>
                        <option value="EXPRESS">EXPRESS</option>
                        <option value="SUPERFAST">SUPERFAST</option>
                        <option value="PASSENGER">PASSENGER</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="totalCoaches" className="form-label">Total Coaches</label>
                    <input type="text" className="form-control" id="totalCoaches" placeholder="Enter the number" name="totalCoaches" onChange={handleChange} />
                </div>

                

                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
    )
}