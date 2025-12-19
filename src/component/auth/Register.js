    import { useState } from "react";
    import { useNavigate } from "react-router-dom";

    export default function Register() {
        const[form, setForm] = useState({
            fullName: "",
            email: "",
            password: "",
            phone: ""
        });
        const router = useNavigate();

        function handleChange(e)  {
            setForm({...form, [e.target.name]: e.target.value });

        }

        function handleSubmit(e) {
            e.preventDefault();
            console.log(form);

            fetch("http://localhost:9000/api/auth/register", {
                method:"POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(form)
            }).then(res => res.json())
            .then(data => {
                console.log(data);
                localStorage.setItem("token", data.token);
                router("/")
            })
            .catch(err => {
                console.log(err.message);
            });
        }

        return (
            <div className="container">
                <h1 className="text-center">Register Form</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label htmlFor="fullname" className="form-label">Full Name</label>
                        <input type="text"className="form-control" id="fullName" name="fullName" placeholder="Enter Full name" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="eamil" className="form-control"  id="email" name="email" placeholder="Enter email"  onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="pwd" className="form-label">Password</label>
                        <input type="pwd" className="form-control" id="pwd" name="password" placeholder="Enter Password" onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input type="text" class="form-control" id="phone" name="phone" placeholder="Enter phone number" onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-success ">Submit</button>
                </form>
            </div>
        )
    }