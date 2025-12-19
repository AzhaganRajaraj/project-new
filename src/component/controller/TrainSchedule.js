import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TrainSchedule() {
    const[schedule, setSchedule] =useState({
        trainId: "",
        originId: "",
        destination: "",
        departureTime: ""
    });
    
    const[train, setTrain] = useState([]);
    const[location, setLocation] = useState([]);


    useEffect(()=>{
        const token = localStorage.getItem("token")
        fetch("http://localhost:9000/api/trains/",{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            setTrain(data)
        
        })
    },[])


    useEffect(() => {
        const token = localStorage.getItem("token")
        fetch("http://localhost:9000/api/locations/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            setLocation(data)
          })
    },[])


    function handleChange(e) {
        setSchedule({ ...setSchedule, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("token");
        fetch("http://localhost:9000/api/trains/", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify({
                trainId: parseInt(schedule.trainId),
                originId: parseInt(schedule.originId),
                destinationId: parseInt(schedule.destination),
                departureTime: schedule.departureTime
            })
        })
         .then(data => {
            console.log(data)
         }).catch(err=>console.log(err))
          
    }

    return (
        <div className="container">
            <h2 className="text-center">Train schedule</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Train</label>
                    <select className="form-control" id="type" name="type" onChange={handleChange}>
                        <option>Choose train</option>
                        {
                            train.map((val)=><option value={val.id}>{val.name}</option>)
                        }
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="originId" className="form-lable">Origin Location ID</label>
                    <select className="form-control" id="originId" name="originId" onChange={handleChange}>
                            <option>Choose Location</option>
                        {
                            location.map((val) =>
                            <option value={val.id}>{val.name}</option>)
                        }
                        
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="destinationId" className="form-label">Destination Location </label>
                    <select  className="form-control"  name="destination" id="destination" onChange={handleChange} >
                         <option>Choose Destination</option>
                        {
                            location.map((val) =>
                            <option value={val.id}>{val.name}</option>)
                        }
                       
                        </select>
                </div>

                <div className="mb-3"> 
                    <label htmlFor="departureTime" className="form-label">Departure Time</label>
                    <input type="number" className="form-control" placeholder="ID" name="departureTime" id="departureTime" onChange={handleChange} />
                </div>

                <button type="submit" className="btn btn-success">submit</button>
            </form>

        </div>
    )
}