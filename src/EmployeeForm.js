import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

function EmployeeForm(props) {

    const handleClose = () => props.setEmpShow(false);
    const [empId, setEmpId] = useState("");
    const [empName, setEmpName] = useState("");
    const [position, setPosition] = useState("");

    const handleEmpIdChange = (e) => {
        setEmpId(e.target.value)
    }

    const handleEmpNameChange = (e) => {
        setEmpName(e.target.value)
    }

    const handleEmpPositionChange = (e) => {
        setPosition(e.target.value)
    }

    const handleSubmit = () => {
        const teamData = props.data.filter((val) => val.name === props.draggedTeamName)
        const found = teamData ? teamData[0].employees.some((val) => val.id === empId) : false
        const formValidation = (!empId || !empName || !position) ? false : true
        if (!found && formValidation) {
            const items = Array.from(props.data);
            const teamObj = {}
            const empObj = {}
            const empArr = teamData[0].employees
            empObj.id = empId
            empObj.position = position
            empObj.name = empName
            empObj.thumb = "/images/avatar.jpg"
            empArr.push(empObj)
            teamObj.employees = empArr
            teamObj.team = props.draggedTeamName
            items.forEach((val, index) => {if(teamObj.team === val.team){items[index]=teamObj}})
            props.updateCharacters(items)
            setEmpId("")
            setEmpName("")
            setPosition("")
            handleClose()
        } else if (found) {
            alert("Employee ID Must Be Unique!")
        } else if (!formValidation) {
            alert("Please Fill All the Required Fields")
        }
    }

    return (
        <>
            <Modal show={props.empShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Team Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmpId">
                            <Form.Label>Employee Id</Form.Label>
                            <Form.Control onChange={handleEmpIdChange} value={empId} placeholder="Enter Employee Id" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmpName">
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control onChange={handleEmpNameChange} value={empName} placeholder="Enter Employee Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmpPosition">
                            <Form.Label>Postion</Form.Label>
                            <Form.Control onChange={handleEmpPositionChange} placeholder="Enter Position" value={position} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EmployeeForm;