import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlockIcon from '@mui/icons-material/Block';
Modal.setAppElement('#root');
function Ban({ id }) {
  const [showModal, setShowModal] = useState(false);
  const [banNote, setBanNote] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const [gifDeleted, setGifDeleted] = useState(false); 
  const fetchData = async () => {
    const confirmed = window.confirm('Czy na pewno chcesz zbanować tego użytkownika?');
    if (!confirmed) {
      return; // Nie wyświetlaj wiadomości o usunięciu gif, jeśli anulowano
    }
  
    if (!selectedDate) {
      console.error('Please select an expiration date.');
      return;
    }
  
    try {
      const token = localStorage.getItem('jwtToken');
  
      // Dodaj 2 godziny do selectedDate
      const expirationDateWithHours = new Date(selectedDate.getTime());
      const expirationDate = expirationDateWithHours.toISOString().slice(0, -5);
  
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
        setGifDeleted(true);
        const data = await response.json();
        console.log('Data from the server:', data);
        toast.success('Użytkownik został zbanowany', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light'
        });
       
      } else {
        console.error('Error while fetching data from the server:', response.status);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error while fetching data from the server:', error);
      window.location.reload();
    }
  };
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleMenuSubmit = () => {
    const expirationDateWithHours = new Date(selectedDate.getTime() + 2 * 60 * 60 * 1000);
    fetchData(expirationDateWithHours)
      .then(() => {
        closeModal();
        
        // Refresh the page
        if (gifDeleted) {
        toast.success('Gif usunięty pomyślnie', {
          position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
          })
          window.location.reload();}
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
        <div>
  <button onClick={handleMenuSubmit}>Submit</button>
  <button onClick={closeModal}>Cancel</button>
</div>
        
      </Modal>
      <ToastContainer
                   transition={Zoom}
                  position="top-right"
                  limit={1}
                  autoClose={1}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick={false}
                  rtl={false}
                  pauseOnFocusLoss={false}
                  draggable={false}
                  pauseOnHover={false}
                  theme="light"
                  />
    </div>
  );
}

export default Ban;