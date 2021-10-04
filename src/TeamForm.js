import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

function TeamForm(props) {

    const handleClose = () => props.setShow(false);
    const [name, setName] = useState("");
    const [empId, setEmpId] = useState("");
    const [empName, setEmpName] = useState("");
    const [position, setPosition] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

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
        const found = props.data.some((val) => val.name === name) // Bonus feature 1 : Two teams cannot have the same name.
        const formValidation = (!name || !empId || !empName || !position) ? false : true
        if (!found && formValidation) {
            const items = Array.from(props.data);
            const teamObj = {}
            const empObj = {}
            const empArr = []
            teamObj.name = name
            empObj.id = empId
            empObj.position = position
            empObj.name = empName
            empObj.thumb = "/images/avatar.jpg"
            empArr.push(empObj)
            teamObj.employees = empArr
            items.push(teamObj)
            props.updateCharacters(items)
            setName("")
            setEmpId("")
            setEmpName("")
            setPosition("")
            handleClose()
        } else if (found) {
            alert("Team Name Must Be Unique!")
        } else if (!formValidation) {
            alert("Please Enter All the Required Fields")
        }
    }

    return (
        <>

            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Team</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={handleNameChange} value={name} placeholder="Enter Name" />
                            <Form.Text className="text-muted">
                                Please make sure the team Name is unique
                            </Form.Text>
                        </Form.Group>
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

export default TeamForm;