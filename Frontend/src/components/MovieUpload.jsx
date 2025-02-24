import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../api";

const MovieUpload = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    description: '',
  });
  
  const [poster, setPoster] = useState(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPoster(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', movieData.title);
    formData.append('description', movieData.description);
    formData.append('poster_path', poster);

    try {
      const response = await api.post("/movies/", formData);
      if (response.status !== 200) {
        throw new Error('Failed to upload movie data');
      }
      const data = response.data;
      console.log(data);
      toast.success("Movie uploaded successfully!", {
        position: "top-center",
      });
      setMovieData({ title: '', description: '' });
      setPoster(null);
      setPreview('');
    } catch (error) {
      console.error(error);
      toast.error('Error uploading movie: ' + error.message,{
        position: "top-center",
      });
    } 
  };

  return (
    <>
    <div className="p-4 bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-6 font-bold text-yellow-400">Upload Movie Information</h1>
      <form
        className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-lg mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={movieData.title}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Description:</label>
          <textarea
            name="description"
            value={movieData.description}
            onChange={handleInputChange}
            className="w-full p-3 bg-gray-700 text-white rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Poster:</label>
          <input
            type="file"
            ref={fileInputRef}
            name="poster_path"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md"
          />
          {preview && (
            <img
              src={preview}
              alt="Poster Preview"
              className="mt-4 max-w-xs rounded-lg"
            />
          )}
        </div>
        <div>
          <button
            type="submit" onClick={handleSubmit}
            className="w-full p-3 bg-yellow-500 text-black font-bold rounded-md"
          >
            Upload
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
    </>
  );
};

export default MovieUpload;
