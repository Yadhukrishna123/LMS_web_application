import React from 'react'

const EditProfile = () => {
    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
    const onCancel = () => {

    }
    return (
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">

            <div className="p-6 border-b flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Edit Institute Profile</h1>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Logo Upload */}
                <div className="flex flex-col items-center">
                    <label className="relative w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50">

                        <img
                            src=""
                            alt="logo"
                            className="w-full h-full object-cover rounded-full"
                        />

                        {/* <span className="text-gray-500">Add Logo</span> */}

                        <input
                            type="file"
                            name="image"
                            className="hidden"
                            onChange={handleChange}
                        />
                    </label>
                </div>

                {/* Grid Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left side */}
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium text-gray-700">
                                Institute Name
                            </label>
                            <input
                                type="text"
                                name="instituteName"
                                // value={formData.instituteName}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                // value={formData.email}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                // value={formData.phone}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Website</label>
                            <input
                                type="text"
                                name="website"
                                // value={formData.website}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">GSTIN</label>
                            <input
                                type="text"
                                name="gstin"
                                // value={formData.gstin}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="space-y-4">
                        <div>
                            <label className="block font-medium text-gray-700">Address</label>
                            <textarea
                                name="address"
                                // value={formData.address}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                                rows="3"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">Founded</label>
                            <input
                                type="text"
                                name="founded"
                                // value={formData.founded}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">
                                Courses Offered
                            </label>
                            <input
                                type="text"
                                name="courses"
                                // value={formData.courses}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">
                                Student Strength
                            </label>
                            <input
                                type="text"
                                name="students"
                                // value={formData.students}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">
                                Placement Rate
                            </label>
                            <input
                                type="text"
                                name="placement"
                                // value={formData.placement}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>
                        <div>
                            <label className="block font-medium text-gray-700">
                                Facilities
                            </label>
                            <input
                                type="text"
                                name="facilities"
                                // value={formData.facilities}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                    <div className='w-[45%]'>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 w-[100%] py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                    </div>
                    <div className='w-[45%]'>
                        <button
                            type="submit"
                            className="px-6 w-[100%] py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>


                </div>
            </form>
        </div>
    )
}

export default EditProfile