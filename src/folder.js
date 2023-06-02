import React, { useState, useEffect } from 'react';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderDeleteIcon from '@mui/icons-material/FolderDelete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Gifen from './awd';
import FolderIcon from '@mui/icons-material/Folder';
import { Link} from "react-router-dom";
import FolderGifs from './gifsinfolder';
import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ToastContainer, toast } from 'react-toastify';
const FolderComponent = () => {
  
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');
  const [editFolderId, setEditFolderId] = useState('');
  const [editFolderName, setEditFolderName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openModal1, setOpenModal1] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [gifId, setIdg] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');;
  useEffect(() => {
    fetchFolders();
    fetchUserGifs();
  }, []);

  const fetchFolders = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(`${window.API_URL}/api/folder/get`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFolders(data);
    } catch (error) {
      console.error('Wystąpił błąd podczas pobierania folderów:', error);
    }
  };

  const fetchUserGifs = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(`${window.API_URL}/api/gif/usergifs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setGifs(data);
      
    } catch (error) {
      console.error('Error fetching user gifs:', error);
    }
  };

  const addFolder = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!newFolderName) {
      alert('Wpisz nazwę folderu');
      return;
    }
    try {
      const response = await fetch(`${window.API_URL}/api/folder/add?name=${newFolderName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newFolderName }),
      });
      const data = await response.json();
      setNewFolderName('');
      fetchFolders();
    } catch (error) {
      console.error('Wystąpił błąd podczas dodawania folderu:', error);
    }
  };

  const openEditModal = (folderId, folderName) => {
    setEditFolderId(folderId);
    setEditFolderName(folderName);
    setOpenModal1(true);
  };

  const closeEditModal = () => {
    setOpenModal1(false);
  };
  const closeAddModal = () => {
    setOpenModal(false);
  };

  const editFolder = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      await fetch(`${window.API_URL}/api/folder/edit?folderId=${editFolderId}&name=${editFolderName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editFolderName }),
      });
      fetchFolders();
      setOpenModal1(false);
      setEditFolderId('');
      setEditFolderName('');
    } catch (error) {
      console.error('Wystąpił błąd podczas edycji folderu:', error);
    }
  };
  const addGifToFolder = async (folderId, gifId) => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(`${window.API_URL}/api/gifs_in_folder/add?id_folder=${folderId}&id_gif=${gifId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setOpenModal(false);
    } catch (error) {
      if (error instanceof SyntaxError) {
        const errorMessage = error.message;
        if (errorMessage.includes('gif added')) {
          console.error('Pierwszy błąd:', error);
          toast.success('Dodano gifa do folderu', {
            position: 'top-right',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
          });
          setOpenModal(false);
          
        } else if (errorMessage.includes('this gif al')) {
          console.error('Drugi błąd:', error);
          toast.error('Gif znajduje się już w tym folderze', {
            position: 'top-right',
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
          });
        }
      } else {
        console.error('Wystąpił błąd podczas dodawania gifa do folderu:', error);
        toast.error('Wystąpił błąd podczas dodawania gifa do folderu');
      }
    }
  };
  const deleteFolder = async (folderId) => {
    const token = localStorage.getItem('jwtToken');
    const confirmed = window.confirm('Czy na pewno chcesz usunąć ten folder?');

    if (!confirmed) {
      return;
    }
    try {
      await fetch(`${window.API_URL}/api/folder/del?folderId=${folderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFolders();
    } catch (error) {
      console.error('Wystąpił błąd podczas usuwania folderu:', error);
    }
  };
  const handleImageClick = (gifId) => {
    setIdg(gifId);
  };
  
  return (
    <div>
      <h1>Foldery</h1>
      <input
      style={{ width: '200px', height: '18px' }}
        type="text"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
      />
      <CreateNewFolderIcon fontSize="large" onClick={addFolder} />
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>
            {folder.name}
             <Link to={`/MojeGify/${folder.id_folder}/${folder.name}`}>
              <IconButton>
            <FolderIcon fontSize="large" onClick={()=> <FolderGifs id={folder.id_folder} name={folder.name} />}/>
            </IconButton>
    </Link>
            <EditIcon onClick={() => openEditModal(folder.id_folder, folder.name)} />
            <FolderDeleteIcon fontSize="large" onClick={() => deleteFolder(folder.id_folder)} />
          </li>
        ))}
      </ul>
      <div className='gal'>
      <h1>Twoje Gify</h1>
      {gifs.map((gif) => (
        <div key={gif.id_gif}>
         <Link to={`/podstrona/${gif.id_gif}`}>
      <img
        src={`${window.API_URL}${gif.reflink}`}
        alt={gif.title}
        style={{ width: '200px', height: '200px' }}
        onClick={()=><Gifen id={gif.id_gif}/>}
        
        
      />
    </Link>
    
    <AddBoxIcon onClick={() => {
  setOpenModal(true);
  handleImageClick(gif.id_gif);
}} />
   
        </div>
        
      ))}</div>
      <Modal
        open={openModal1}
        onClose={closeEditModal}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ backgroundColor: 'white', padding: '20px' }}>
          <h2>Edytuj folder</h2>
          <TextField
            label="Nowa nazwa"
            value={editFolderName}
            onChange={(e) => setEditFolderName(e.target.value)}
          />
          <Button variant="contained" onClick={editFolder}>
            Zapisz
          </Button>
        </div>
      </Modal>
      <Modal
  open={openModal}
  onClose={closeAddModal}
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <div style={{ backgroundColor: 'white', padding: '20px' }}>
    <h2>Wybierz folder</h2>
    <select value={selectedFolder} onChange={(e) => setSelectedFolder(e.target.value)}>
      <option value="">Wybierz folder</option>
      {folders.map((folder) => (
        <option key={folder.id_folder} value={folder.id_folder}>
          {folder.name}
        </option>
      ))}
    </select>
    <Button variant="contained" onClick={() => addGifToFolder(selectedFolder, gifId)}>
      Dodaj do folderu
    </Button>
  </div>
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
};

export default FolderComponent;