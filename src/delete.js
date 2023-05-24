import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Delete({ id }) {
  const handleDelete = async () => {
    // Pobierz informacje o zalogowanym użytkowniku z localStorage
    const user_id = localStorage.getItem('user_id');
    const user_role = localStorage.getItem('user_role');

    // Sprawdź czy user_id pasuje do gifa lub czy użytkownik ma rolę administratora (Admin)
    if ( user_role !== 'Admin') {
      toast.error('Brak uprawnień do usunięcia gifa', {
        position: 'top-right',
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    try {
      const response = await fetch(`${window.API_URL}/api/gif/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Usunięto', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
        console.log('Gif został usunięty');
        // Tutaj możesz wykonać dodatkowe działania, takie jak odświeżenie listy gifów itp.
      } else {
        toast.warn('Wystąpił problem podczas usuwania gifa', {
          position: 'top-right',
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
        console.log('Wystąpił problem podczas usuwania gifa');
      }
    } catch (error) {
      console.log('Wystąpił błąd sieci', error);
    }
  };

  // Sprawdź czy zalogowany użytkownik jest właścicielem gifa lub administratorem
  const user_id = localStorage.getItem('user_id');
  const user_role = localStorage.getItem('user_role');
  const isAdmin = user_role === 'Admin';
  const shouldDisplayButton = isAdmin;

  return (
    <>
      {shouldDisplayButton && (
        <button
          onClick={handleDelete}
          style={{
            color: 'white',
            backgroundColor: '#663399',
            borderRadius: '4px',
            height: '25px',
            width: '100px',
          }}
        >
          Usuń
        </button>
      )}
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
      />
    </>
  );
}

export default Delete;