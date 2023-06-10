import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';
function Ignore({id}) {
  const fetchData = async () => {
    const confirmed = window.confirm('Czy na pewno chcesz zignorować to zgłoszenie?');

  if (!confirmed) {
    // Jeśli użytkownik nie potwierdzi usunięcia, zakończ funkcję
    return;
  }
    if (!id) {
      console.error('Please provide an ID.');
      return;
    }

    

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(
        `${window.API_URL}/api/ban/ignore?gifId=${id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        window.location.reload();
        toast.success('Gif dodany pomyślnie', {
          position: "top-right",
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
            })
        const data = await response.json();
        console.log('Data from the server:', data);
      } else {
        console.error('Error while fetching data from the server:', response.status);
      }
    } catch (error) {
      console.error('Error while fetching data from the server:', error);
    }
  };



  useEffect(() => {
  }, [id]);

  return (
    <div className="button-container">
      <NotificationsPausedIcon onClick={fetchData}></NotificationsPausedIcon>
      <ToastContainer
      limit={1}
        position="top-right"
        autoClose={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Ignore;