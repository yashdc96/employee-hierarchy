import React, { useState, useEffect } from 'react';
import './App.css';
import Hierarchy from './Hierarchy';
import { LOCALES } from './locales'
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion'
import FilterSearch from './FilterSearch';

function App() {
  const abc = () => {
    localStorage.setItem('Employees', JSON.stringify(LOCALES()))
    const result = localStorage.getItem('Employees')
    setDataSource(JSON.parse(result))
    console.log(JSON.parse(result))
  }
  const [dataSource, setDataSource] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    abc()
  }, []);

  return (
    <div className="Accordion-header">
      <div style={{ textAlignLast: 'center', color: '#98f2fb' }}><h3> Commutatus Employee Hierarchy </h3></div>
      <div style={{ paddingBottom: '15px', paddingTop: '10px' }}>
        <FilterSearch setSearchValue={setSearchValue} searchValue={searchValue} />
      </div>
      {searchValue && <div style={{ paddingBottom: '5px', paddingTop: '5px', color: 'red', fontSize: '25px' }}>
        <label>You are now seeing filtered values:</label>
      </div>}
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          {dataSource &&
            <Accordion.Header>Welcome CEO! Expand To See Your Team</Accordion.Header>}
          <Accordion.Body>
            {dataSource.map((val) => {
              return (
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="1">
                    {/* Bonus feature 2 : We should be able to select a Team/Head and should be able to see all the employees who are under them. */}
                    <Accordion.Header>{val.type}</Accordion.Header>
                    <Accordion.Body>
                      <label style={{ color: 'brown', paddingRight: '35px', paddingLeft: '320px' }}> <strong>Team Head Name:</strong> {val.headName}</label>
                      <label style={{ color: 'brown' }}> <strong>Team Head Email:</strong> {val.headId}</label>
                      <Hierarchy data={val.teams} searchValue={searchValue} />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              );
            })}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div style={{ paddingBottom: '5px', paddingTop: '5px', color: 'orange', fontSize: '15px' }}>
        <label>*Use drag and drop to change team/level of each employee</label>
      </div>
    </div>
  );
}

export default App;