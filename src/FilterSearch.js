
import React from 'react';

function FilterSearch(props) {

    // const [empId, setEmpId] = useState("");
    // const [empName, setEmpName] = useState("");
    // const [position, setPosition] = useState("");


    const handleChange = (e) => {
        props.setSearchValue(e.target.value)
    }

   

    return (
        <>
            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Search By Employee Name, Position or Email ID" onChange = {handleChange} value = {props.searchValue}/>
        </>
    );
}

export default FilterSearch;