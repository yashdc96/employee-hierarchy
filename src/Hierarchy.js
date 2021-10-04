import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState, useEffect } from 'react';
import { EditText } from 'react-edit-text';
import Button from 'react-bootstrap/Button';
import 'react-edit-text/dist/index.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import TeamForm from './TeamForm';
import EmployeeForm from './EmployeeForm';

const Hierarchy = (props) => {
    const [characters, updateCharacters] = useState(props.data);
    const [draggedItem, setDraggedItem] = useState({});
    const [droppableId, setDroppableId] = useState("");
    const [draggedTeamName, setDraggedTeamName] = useState("");
    const [show, setShow] = useState(false);
    const [empShow, setEmpShow] = useState(false);

    const handleShow = () => setShow(true);

    const handleEmpShow = (name, e) => {
        setEmpShow(true)
        setDraggedTeamName(name)
    };

    function handleOnDragEnd(result) {
        const items = Array.from(characters);
        if (!result.destination) return;
        if (result.destination.droppableId !== result.source.droppableId) {
            items.forEach((val) => {
                if (val && val.name === result.source.droppableId) {
                    if (val.employees.length < 2) {
                        return
                    } else {
                        val.employees.forEach((emp, index) => {
                            if (emp.id === result.draggableId) {
                                setDraggedItem({ ...emp })
                                val.employees.splice(index, 1)
                                setDroppableId(result.destination.droppableId)
                            }
                        })
                    }
                }
            })

            //Bonus Feature 3: Promoting/Demoting employee level in same team.
        } else {
            items.forEach((val) => {
                if (val) {
                    for (let i = 0; i < val.employees.length; i++) {
                        const emp = val.employees[i]
                        if (emp.id === result.draggableId) {
                            const [reorderedItem] = val.employees.splice(result.source.index, 1);
                            val.employees.splice(result.destination.index, 0, reorderedItem);
                            break;
                        }
                    }
                }
            })
        }
        console.log(result)
        updateCharacters(items);
    }

    useEffect(() => {
        const items = Array.from(characters);
        items.forEach((val) => {
            if (val.name === droppableId && draggedItem) {
                val.employees.push(draggedItem)
            }
        })
        updateCharacters(items);
    }, [draggedItem, droppableId]);

    const handleNameChange = (teamIndex, index, e) => {
        const items = Array.from(characters);
        items[teamIndex].employees[index].name = e
        updateCharacters(items);
    }

    const handlePositionChange = (teamIndex, index, e) => {
        const items = Array.from(characters);
        items[teamIndex].employees[index].position = e
        updateCharacters(items);
    }

    const handleDelete = (teamIndex, index, e) => {
        const items = Array.from(characters);
        if (items[teamIndex].employees.length < 2) {
            alert("There Must Be At Least One Employee in Each Team!")
        } else {
            items[teamIndex].employees.splice(index, 1)
            updateCharacters(items);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        {characters && characters.map((val, teamIndex) => {
                            return (
                                <div style={{ backgroundColor: 'grey' }}>
                                    {val && <div><h5>Team: {val.name}</h5></div>}
                                    {val && <Droppable droppableId={val.name}>
                                        {(provided) => (
                                            <>
                                                <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                                    {!props.searchValue &&
                                                        <React.Fragment>
                                                            {val && val.employees.map(({ id, name, position, thumb }, index) => {
                                                                return (
                                                                    <>
                                                                        <Draggable key={id} draggableId={id} index={index}>
                                                                            {(provided) => (
                                                                                <div style={{ ".:hover": { background: "white" } }}>
                                                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                                        <span className="characters-thumb" style={{ paddingBottom: '2px' }}>
                                                                                            <img src={thumb} style={{ height: '40px', position: 'absolute', left: '72px' }} alt={`${name} Thumb`} />
                                                                                        </span>
                                                                                        <span style={{ fontSize: '20px', position: 'absolute', left: '115px' }}> Name: </span> <EditText value={name} style={{ fontSize: '20px', width: '10%', position: 'absolute', left: '190px', margin: '0px', padding: '0px', textAlign: '-webkit-left' }} onChange={(e) => handleNameChange(teamIndex, index, e)} />
                                                                                        <span style={{ fontSize: '20px', position: 'absolute', left: '370px' }}> Position: </span> <EditText value={position} style={{ fontSize: '20px', width: '13%', position: 'absolute', left: '460px', margin: '0px', padding: '0px', textAlign: '-webkit-left' }} onChange={(e) => handlePositionChange(teamIndex, index, e)} />
                                                                                        <span style={{ fontSize: '20px', position: 'absolute', left: '675px' }}> Level: {index + 1}</span>
                                                                                        <span style={{ fontSize: '20px', position: 'absolute', left: '805px' }}> Email Id: </span> <EditText type='email' value={id} style={{ fontSize: '20px', width: '20%', position: 'absolute', left: '900px', margin: '0px', padding: '0px', textAlign: '-webkit-left' }} onChange={(e) => handlePositionChange(teamIndex, index, e)} />
                                                                                        <span style={{ paddingLeft: '1000px' }}> <Button variant="secondary" onClick={(e) => handleDelete(teamIndex, index, e)}> Remove <i class="bi bi-x-square-fill md"></i> </Button> </span>
                                                                                    </li>
                                                                                </div>
                                                                            )}
                                                                        </Draggable>
                                                                    </>
                                                                );
                                                            })}
                                                        </React.Fragment>
                                                    }

                                                    {props.searchValue &&
                                                        <React.Fragment>
                                                            {val && val.employees.filter((val) => { if ((val.name.toLowerCase()) === props.searchValue.toLowerCase() || (val.id.toLowerCase()) === props.searchValue.toLowerCase() || (val.position.toLowerCase()) === props.searchValue.toLowerCase()) { return true } }).map(({ id, name, position, thumb }, index) => {
                                                                return (
                                                                    <>
                                                                        <Draggable key={id} draggableId={id} index={index}>
                                                                            {(provided) => (
                                                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                                    <span className="characters-thumb" style={{ paddingBottom: '2px' }}>
                                                                                        <img src={thumb} style={{ height: '40px', position: 'absolute', left: '72px' }} alt={`${name} Thumb`} />
                                                                                    </span>
                                                                                    <span style={{ fontSize: '20px', position: 'absolute', left: '115px' }}> Name: </span> <EditText value={name} style={{ fontSize: '20px', width: '10%', position: 'absolute', left: '190px', margin: '0px', padding: '0px', textAlign: '-webkit-left' }} onChange={(e) => handleNameChange(teamIndex, index, e)} />
                                                                                    <span style={{ fontSize: '20px', position: 'absolute', left: '370px' }}> Position: </span> <EditText value={position} style={{ fontSize: '20px', width: '13%', position: 'absolute', left: '460px', margin: '0px', padding: '0px', textAlign: '-webkit-left' }} onChange={(e) => handlePositionChange(teamIndex, index, e)} />
                                                                                    <span style={{ fontSize: '20px', position: 'absolute', left: '675px' }}> Level: {index + 1}</span>
                                                                                    <span style={{ fontSize: '20px', position: 'absolute', left: '805px' }}> Email Id: </span> <EditText type='email' value={id} style={{ fontSize: '20px', width: '20%', position: 'absolute', left: '900px', margin: '0px', padding: '0px', textAlign: '-webkit-left' }} onChange={(e) => handlePositionChange(teamIndex, index, e)} />
                                                                                    <span style={{ paddingLeft: '1000px' }}> <Button variant="secondary" onClick={(e) => handleDelete(teamIndex, index, e)}> Remove <i class="bi bi-x-square-fill md"></i> </Button> </span>
                                                                                </li>
                                                                            )}
                                                                        </Draggable>
                                                                    </>
                                                                );
                                                            })}
                                                        </React.Fragment>
                                                    }
                                                    {provided.placeholder}
                                                </ul>
                                                <div style={{ paddingBottom: '7px' }}> <Button variant="secondary" onClick={(e) => handleEmpShow(val.name, e)}>Add New Team Member <i class="bi bi-plus-circle-fill"></i> </Button></div>
                                            </>
                                        )}
                                    </Droppable>}
                                </div>
                            );
                        })}
                    </DragDropContext>
                    <div style={{ paddingBottom: '7px', paddingTop: '3px' }}>
                        <Button variant="primary" onClick={handleShow}>
                            Add New Team
                        </Button>
                    </div>
                    <TeamForm data={characters} updateCharacters={updateCharacters} setShow={setShow} show={show} />
                    <EmployeeForm data={characters} updateCharacters={updateCharacters} setEmpShow={setEmpShow} empShow={empShow} draggedTeamName={draggedTeamName} />
                </div>
            </header>
        </div>
    );
};

export default Hierarchy;