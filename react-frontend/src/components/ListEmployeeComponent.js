import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const ListEmployeeComponent = (prop) => {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const fetchData = () => {
        EmployeeService.getEmployees().then((res) => {
            //console.log(res);
            setEmployees(res.data);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const addEmployee = (e) => {
        navigate('/add-employee');
    }

    const updateEmployee = (id) => {
        navigate(`/update-employee/${id}`);
    }

    const deleteEmployee = (id) => {
        EmployeeService.deleteEmployee(id).then(res => {
            setEmployees(employees.filter(employee => employee.id !== id));
        });
    }

    return (
        <div>
            <h2 className="text-center" style={{marginTop: "40px"}}>Employees List</h2>
            {/* <div className="row"> */}
                <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
            {/* </div> */}
            <div className="row">
                <table className="table tabled-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Employee First Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map(
                                employee => 
                                <tr key = {employee.id}>
                                    <td> {employee.firstName} </td>
                                    <td> {employee.lastName} </td>
                                    <td> {employee.emailId} </td>
                                    <td>
                                        <button onClick={() => updateEmployee(employee.id)} className="btn btn-info">Update</button>
                                        <button onClick={() => deleteEmployee(employee.id)} className="btn btn-danger" style={{marginLeft: "10px"}}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
    );
}

export default ListEmployeeComponent;