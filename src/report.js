import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Ban from './ban';
import Ignore from './ignore';
function ReportList() {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      fetch(`${window.API_URL}/api/report/get`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setReports(data);
          console.log('reports:', data);
        })
        .catch(error => {
          console.error('An error occurred:', error);
        });
    }
  }, []);

  
  return (
    <div className="report-list">
    {reports.map((gif,index) => (
      <div key={index}>
        <IconButton>
          
        <Link
          to={`${window.API_URL2}/podstrona/${gif.id_gif}`}
          className="report-link"
        >
           <img
        src={`${window.API_URL}${gif.reflink}`}
        alt={gif.title}
        style={{ width: '200px', height: '200px' }}
        
        
      />
          
        </Link>
        </IconButton>
        <p className="report-info">Ilość zgłoszeń: {gif.reportCount}</p>
        <IconButton>
        <Ban id={gif.id_gif} showModal={showModal} setShowModal={setShowModal}/>
        </IconButton>
        <IconButton>
        <Ignore id={gif.id_gif}></Ignore>
        </IconButton>
      </div>
    ))}
  </div>
  );
}

export default ReportList;