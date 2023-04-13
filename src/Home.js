import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import gif1 from './gif/gif1.gif';
import gif2 from './gif/gif2.gif';
import gif3 from './gif/gif3.gif';
import gif4 from './gif/gif4.gif';
import gif5 from './gif/gif5.gif';
import gif6 from './gif/gif6.gif';
import gif7 from './gif/gif7.gif';
import gif8 from './gif/gif8.gif';
import gif9 from './gif/gif9.gif';
const GifGallery = () => {
  let data=[
    {
      id:1,
      imgSrc:gif1,
    },
    {
      id:2,
      imgSrc:gif2,
    },
    {
      id:3,
      imgSrc:gif8,
    },
    {
      id:4,
      imgSrc:gif4,
    },
    {
      id:5,
      imgSrc:gif6,
    },
    {
      id:6,
      imgSrc:gif5,
    },
    {
      id:7,
      imgSrc:gif7,
    },
    {
      id:8,
      imgSrc:gif9,
    },
    {
      id:9,
      imgSrc:gif3,
    }
  ]
  const [model, setModel] = useState(false);
  const [tempimgSrc, setTempImgSrc] = useState('');
  const getImg = (imgSrc)=>{
    setTempImgSrc(imgSrc);
    setModel(true);
  }
  return(
    <>
    <div className={model? "model open" : "model"}>
      <img src={tempimgSrc}/>
      <CloseIcon onClick={()=>setModel(false)}/>
s
    </div>
    <div className='gallery'>
        {data.map((item, index) => {
          return (
            <div className="gifs" key={index} onClick={() => getImg(item.imgSrc)}>
              <img src={item.imgSrc} style={{ width: '100%' }} />
            </div>
          )
        })}
    </div>
    </>
  )
}
export default GifGallery;