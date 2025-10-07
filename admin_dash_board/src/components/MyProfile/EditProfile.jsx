import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';




const EditProfile = () => {
    let [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        institutionName: "",
        address: "",
        email: "",
        phone: "",
        website: "",
        gstin: "",
        accreditation: "",
        founded: "",
        courses: "",
        students: "",
        placement: "",
        facilities: ""
    })
    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    console.log(inputs);


    const getInstitution = async () => {
        try {
            let res = await axios.get(`http://localhost:8080/api/v1/get_institute/${id}`)
            console.log(res.data);
            setInputs({
                institutionName: res.data.institution.instituteName,
                address: res.data.institution.address,
                phone: res.data.institution.phone,
                website: res.data.institution.website,
                gstin: res.data.institution.gstin,
                accreditation: res.data.institution.accreditation,
                founded: res.data.institution.founded,
                courses: res.data.institution.courses,
                students: res.data.institution.students,
                placement: res.data.institution.placement,
                facilities: res.data.institution.facilities,

            })





            // setInputs(res.data.institution)


        } catch (error) {

        }
    }
    console.log(inputs);

    useEffect(() => {
        getInstitution()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        let payload = {
            instituteName: inputs.institutionName,
            address: inputs.address,
            email: inputs.email,
            phone: inputs.phone,
            website: inputs.website,
            gstin: inputs.gstin,
            accreditation: inputs.accreditation,
            founded: inputs.founded,
            courses: inputs.courses,
            students: inputs.students,
            placement: inputs.placement,
            facilities: inputs.facilities
        }
        try {
            let res = await axios.put(`http://localhost:8080/api/v1/get_institute/${id}`, payload)
            if (res.data.success) {
                toast.success(res.data.message)

                await new Promise((back) => setTimeout(back, 2000))

                navigate("/my_profile")
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <ToastContainer />
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-6">
                <Link to="/my_profile" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition mb-4">
                    <FaArrowLeft /> Back to Profile
                </Link>
                <h2 className="text-2xl font-bold text-gray-800">Edit Institute Profile</h2>
            </div>

            {/* Form Card */}
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
                <form onSubmit={handleSubmit}>
                    {/* Image Upload Section */}
                    <div className="p-6 border-b bg-gray-50">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Institute Logo</h3>
                        <div className="flex items-center gap-6">
                            <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                <img src="" alt="Preview" className="w-full h-full object-cover" />
                                {/* {imagePreview ? (
                                    
                                ) : (
                                    <FaUpload className="text-gray-400 text-2xl" />
                                )} */}
                            </div>
                            <div>
                                <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition inline-block">
                                    Choose Image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        // onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF (MAX. 2MB)</p>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Institute Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Institute Name *
                                </label>
                                <input
                                    type="text"
                                    name="institutionName"
                                    value={inputs.institutionName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter institute name"
                                />
                            </div>

                            {/* Address */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address *
                                </label>
                                <textarea
                                    name="address"
                                    value={inputs.address}
                                    onChange={handleChange}
                                    required
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter full address"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={inputs.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="institute@example.com"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone *
                                </label>
                                <input
                                    name="phone"
                                    value={inputs.phone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="+91 1234567890"
                                />
                            </div>

                            {/* Website */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={inputs.website}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://www.example.com"
                                />
                            </div>

                            {/* GSTIN */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    GSTIN
                                </label>
                                <input
                                    type="text"
                                    name="gstin"
                                    value={inputs.gstin}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter GSTIN"
                                />
                            </div>

                            {/* Founded */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Founded Year
                                </label>
                                <input
                                    type="text"
                                    name="founded"
                                    value={inputs.founded}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 1990"
                                />
                            </div>

                            {/* Courses */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Courses Offered
                                </label>
                                <input
                                    type="text"
                                    name="courses"
                                    value={inputs.courses}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., B.Tech, MBA, BCA"
                                />
                            </div>

                            {/* Students */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Student Strength
                                </label>
                                <input
                                    type="text"
                                    name="students"
                                    value={inputs.students}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 5000+"
                                />
                            </div>

                            {/* Placement */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Placement Rate
                                </label>
                                <input
                                    type="text"
                                    name="placement"
                                    value={inputs.placement}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 85%"
                                />
                            </div>

                            {/* Accreditation/Facilities */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Facilities
                                </label>
                                <textarea
                                    name="facilities"
                                    value={inputs.facilities}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Library, Labs, Sports Complex, etc."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 disabled:opacity-50"
                    >
                        {loading && (
                            <div className="w-5 h-5 mr-2 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile