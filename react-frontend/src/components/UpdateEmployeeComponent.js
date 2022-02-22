import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const UpdateEmployeeComponent = (prop) => {

    const { id } = useParams();
    //console.log({id});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    //Retrieved employee by id, and set response to state, so form is populated with first name, last name, and email
    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => {
            const employee = res.data;
            setFirstName(employee.firstName);
            setLastName(employee.lastName);
            setEmail(employee.emailId);
        });
    }, [id]);

    const updateEmployee = event => { 
        event.preventDefault();
        const employee = {firstName: firstName, lastName: lastName, emailId: email};
        // console.log("updated employee:" + JSON.stringify(employee));

        EmployeeService.updateEmployee(employee, id).then(res => {
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
                        <h3 className="text-center" style={{marginTop: "20px"}}>Update Employee</h3>
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
                                    <button className="btn btn-success" onClick={updateEmployee}>Save</button>
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

export default UpdateEmployeeComponent;