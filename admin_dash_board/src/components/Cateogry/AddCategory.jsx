import React, { useState } from 'react'
import axios from "axios"
import { Navigate, useNavigate } from 'react-router-dom'


const AddCategory = () => {
    const navigate = useNavigate();
    let [inputs, setInputs] = useState({
        title: "", desc: "", image: null
    })
    const preset_key = "arsmfwi7"
    const cloud_name = "dnqlt6cit"



    const handleChange = (e) => {
        const { name, files, value } = e.target
        if (files && files.length > 0) {
            setInputs({ ...inputs, [name]: files[0] })
        } else {
            setInputs({ ...inputs, [name]: value })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        alert("Datas Uploaded Succesfully...")
        navigate('/view_course_cateogry')
        
        try {
            let img_url = null;
            if (inputs.image) {
                const formData = new FormData()
                formData.append("file", inputs.image)
                formData.append("upload_preset", preset_key)

                let imageRes = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)

                console.log(imageRes);
                img_url = imageRes.data.secure_url




            }
            let payloads = {
                title: inputs.title,
                description: inputs.desc,
                image: img_url

            }

            let res = await axios.post("http://localhost:8080/add_course_cateogry", payloads)
            console.log(res);
            setInputs({ title: "", desc: "", image: null });
            
        } catch (error) {

        }
    }
    //console.log(inputs);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Course Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Course Title"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    name="desc"
                    placeholder="Course Description"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                ></textarea>


                <input
                    type="file"
                    name="image"
                    placeholder="Image URL"
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Add Course Category
                </button>
            </form>
        </div>
    )
}

export default AddCategory