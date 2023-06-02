import React, { useState, useEffect } from 'react';
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
    {reports.map(gif => (
      <div key={gif.id}>
        <Link
          to={`http://localhost:3000/podstrona/${gif.id_gif}`}
          className="report-link"
        >
          Zgłoszony gif
        </Link>
        <p className="report-info">Report Count: {gif.reportCount}</p>
        <Ban id={gif.id_gif} showModal={showModal} setShowModal={setShowModal}/>
        <Ignore id={gif.id_gif}></Ignore>
      </div>
    ))}
  </div>
  );
}

export default ReportList;