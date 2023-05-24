import React, { useState } from 'react';

function Edit({ gif }) {
  const [formData, setFormData] = useState({
    category: gif.category,
    tags: gif.tags,
    title: gif.title,
    gifType: gif.gifType,
  });

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        console.log('Brak tokenu JWT. Nieautoryzowany dostęp.');
        return;
      }

      // Sprawdzanie roli użytkownika na podstawie tokenu JWT
      const decodedToken = decodeJWT(token);
      if (!decodedToken || decodedToken.role !== '') {
        console.log('Nie masz uprawnień do edycji.');
        return;
      }

      const response = await fetch(`/api/gif/edit/${gif.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Edycja powiodła się
        console.log('Gif został zaktualizowany');
        // Tutaj możesz wykonać dodatkowe działania, takie jak odświeżenie listy gifów itp.
      } else {
        console.log('Wystąpił problem podczas edycji gifa');
      }
    } catch (error) {
      console.log('Wystąpił błąd sieci', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  return (
    <div>
      <button onClick={handleEdit} style={{ color: 'white', backgroundColor: 'green', borderRadius: '8px' }}>
        Edytuj gif
      </button>
      <div>
        <label>
          Kategoria:
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </label>
        <label>
          Tagi:
          <input type="text" name="tags" value={formData.tags} onChange={handleChange} />
        </label>
        <label>
          Tytuł:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <label>
          Prywatny:
          <select name="gifType" value={formData.gifType} onChange={handleChange}>
            <option value="false">Tak</option>
            <option value="true">Nie</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default Edit;