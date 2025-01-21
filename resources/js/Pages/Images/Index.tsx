// resources/js/Pages/Images/Index.jsx
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const ImageIndex = ({ images }) => {
  const { data, setData, post, errors } = useForm({
    title: '',
    image: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('images.store'));
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Image Upload</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => setData('title', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
          {errors.title && <span className="text-red-500">{errors.title}</span>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setData('image', e.target.files[0])}
            className="mt-1 block w-full"
          />
          {errors.image && <span className="text-red-500">{errors.image}</span>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Upload
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8">Uploaded Images</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((image) => (
          <div key={image.id} className="border p-2 rounded-md">
            <img
              src={`/storage/${image.file_path}`}
              alt={image.title}
              className="w-full h-auto"
            />
            <p className="text-center mt-2">{image.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageIndex;
