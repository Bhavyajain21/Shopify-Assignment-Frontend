import React, { Component, useEffect, useState } from 'react';
import Like from './common/Like';
const DisplayImage = () => {
    const [url,setUrl] = useState([]);
    const handleLike = (photo) => {
        const photos = [...url];
        const index = photos.indexOf(photo);
        photos[index] = {...photos[index]};
        photos[index].liked = !photos[index].liked;
        setUrl(photos);
        localStorage.setItem('photos',JSON.stringify(photos));
    }
    const handleSort = () => {
        const photos = [...url];
        photos.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
        });
        setUrl(photos)
        console.log(photos);
    }
    useEffect(()=>{
        if(localStorage.getItem('photos')!=null)
        {
            const photos = JSON.parse(localStorage.getItem('photos'));
            setUrl(photos);
            console.log(photos);
        }
        else
        {
            fetch("https://api.nasa.gov/planetary/apod?api_key=fg21ny5K58DVdBOdXyP0RIEP7zXdG4V0FLGBNn0I&count=20")
            .then(res=>res.json())
            .then((data)=>{
                setUrl(data);
                console.log(data);
            })
        }
    },[])
    return (<>
        <div className="initial">
        <button className='sort-btn'  onClick={handleSort}>Show Latest !</button>  
        {url.map((photo)=>{
            return (
                <div>
                    <div className='main'>
                    <div className='outer'>
                        <h2 className='title'>{photo.title}</h2>
                        <img src={photo.url} alt='Image Not Fetched' width={400}/>
                        <p><b>{photo.date}</b></p>
                        <p><i>{photo.explanation}</i></p>
                        <Like liked={photo.liked} onClick={()=>handleLike(photo)}/>
                    </div>
                    </div>
                </div>
            ); 
        })}
        </div>
    </>);
}
 
export default DisplayImage;