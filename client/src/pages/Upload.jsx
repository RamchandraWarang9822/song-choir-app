import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField, Loader } from '../components';
import axios from "axios";

const Upload = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    artist: '',
    tempo: '',
    link: ''
  })
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState();

  const uploadDetails = async (e) => {

    e.preventDefault();
    const { title, artist, tempo, link } = form;

    const formData = JSON.stringify({
      title,
      artist,
      tempo,
      link
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result = await axios.post('/api/upload', formData, config);
    console.log(result.data.data); 
  }
  
  let name,value;

  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setForm({...form,[name]:value});
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm( { ...form,[name]: value})
  // }

  const handleIsEmpty = (e) => {
    if (e.target.value === '') {
      return true;
    }
    return false;
  }

  const handleSubmit = () => {

  }


  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[222328] text-[32px]'>
          Upload 
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">Upload Song details and Lyrics Images</p>
      </div>

      <form method="POST" className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName='Song Name'
            type="text"
            name='title'
            placeholder='Enter song name here'
            value={form.title}
            handleChange={handleChange}
            isEmpty={handleIsEmpty}
          />

          <FormField
            labelName='Artist'
            type="text"
            name='artist'
            placeholder='Enter artist name here'
            value={form.artist}
            handleChange={handleChange}
          />

          <FormField
            labelName='Tempo'
            type="Integer"
            name='tempo'
            placeholder='Enter artist name here'
            value={form.tempo}
            handleChange={handleChange}
          />

          <FormField
            labelName='Link'
            type="text"
            name='link'
            placeholder='Enter link here'
            value={form.link}
            handleChange={handleChange}
          />
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[13px]'>
            Once you have entered all the details of the song, you can upload the lyrics image.
          </p>
          <button
            type='submit'
            onClick={uploadDetails}
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Upload