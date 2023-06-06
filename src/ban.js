import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlockIcon from '@mui/icons-material/Block';
function Ban({ id }) {
  const [showModal, setShowModal] = useState(false);
  const [banNote, setBanNote] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const fetchData = async () => {
    const confirmed = window.confirm('Czy na pewno chcesz zbanować tego gifa?');

  if (!confirmed) {
    // Jeśli użytkownik nie potwierdzi usunięcia, zakończ funkcję
    return;
  }
    if (!selectedDate) {
      console.error('Please select an expiration date.');
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const expirationDate = selectedDate.toISOString().slice(0, -5);
      const response = await fetch(
        `${window.API_URL}/api/ban?gifId=${id}&expirationDate=${expirationDate}&banNote=${banNote}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Data from the server:', data);
      } else {
        console.error('Error while fetching data from the server:', response.status);
      }
    } catch (error) {
      console.error('Error while fetching data from the server:', error);
      toast.error('Ten użytkownik został już zbanowany, ten gif zostanie usunięty');
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleMenuSubmit = () => {
    
    fetchData()
      .then(() => {
        closeModal();
        // Refresh the page
        toast.success('Gif usunięty pomyślnie', {
          position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          })
      })
      .catch((error) => {
        console.error('Error while submitting ban:', error);
        toast.error('Error submitting ban'); // Show an error toast notification if the ban submission fails
      });
  };
  


  return (
    <div>
      <BlockIcon onClick={openModal}></BlockIcon>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Ban Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: '30%'
          }
        }}
      >
        <input
          type="text"
          value={banNote}
          onChange={(event) => setBanNote(event.target.value)}
          placeholder="Ban note"
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="yyyy-MM-dd HH:mm:ss"
          timeFormat="HH:mm:ss"
          timeIntervals={1}
          timeCaption="Time"
          placeholderText="Select expiration date"
        />
        <button onClick={handleMenuSubmit}>Submit</button>
        <button onClick={closeModal}>Cancel</button>
        
      </Modal>
      <ToastContainer
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

export default Ban;