import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function ReportList() {
  const [reports, setReports] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

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
          console.log('gif:', data);
        })
        .catch(error => {
          console.error('An error occurred:', error);
        });
    }
  }, []);

  const token = localStorage.getItem('jwtToken');
  const user_role = localStorage.getItem('user_role');

  const toggleList = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleReportChange = event => {
    const selectedValue = event.target.value;
    setSelectedReport(selectedValue);
  };

  const handleReportClick = () => {
    if (selectedReport) {
      Navigate(`/reports/${selectedReport}`);
    }
  };

  return (
    <div>
      {user_role === 'Admin' && token ? (
        <>
        <div className='dropdown'>
          <select value={selectedReport} onChange={handleReportChange} >
            <option value="">Zgłoszenia</option>
            {reports.map(report => (
              <option key={report.id} value={report.id}>
                <span style={{ color: 'white' }}>{report.reportCount} </span>
              </option>
            ))}
          </select>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default ReportList;