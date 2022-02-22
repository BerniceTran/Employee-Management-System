import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const CreateEmployeeComponent = (prop) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const saveEmployee = event => { 
        event.preventDefault();
        const employee = {firstName: firstName, lastName: lastName, emailId: email};
        // console.log("employee:" + JSON.stringify(employee));

        EmployeeService.createEmployee(employee).then(res => {
            navigate('/employees');
        });
    }

    const changeFirstNameHandler = event => { 
        setFirstName(event.target.value);
        //  console.log(event.target.value);
    }

    const changeLastNameHandler = event => { 
        setLastName(event.target.value);
    }

    const changeEmailHandler = event => { 
        setEmail(event.target.value);
    }

    const cancel = event => {
        navigate('/employees');
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3" style={{marginTop: "40px"}}>
                        <h3 className="text-center" style={{marginTop: "20px"}}>Add Employee</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input placeholder="First Name" name="firstName" className="form-control"
                                        value={firstName} onChange={changeFirstNameHandler}/>
                                    <label>Last Name</label>
                                    <input placeholder="Last Name" name="lastName" className="form-control"
                                        value={lastName} onChange={changeLastNameHandler}/>  
                                    <label>Email Address</label>
                                    <input placeholder="Email Address" name="emailId" className="form-control"
                                        value={email} onChange={changeEmailHandler} style={{marginBottom: "10px"}}/>
                                    <button className="btn btn-success" onClick={saveEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={cancel} style={{marginLeft: "10px"}}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default CreateEmployeeComponent;