import React, { useEffect, useState } from 'react'
import axios from "axios"

const UploadedVideos = () => {
    let [videos, setVideos] = useState([])

    const getAllVideos = async () => {
        try {
            let res = await axios.get("http://localhost:8080/api/v1/get_all_records")
            console.log(res.data.data);
            setVideos(res.data.data)

        } catch (error) {

        }
    }

    useEffect(() => {
        getAllVideos()
    }, [])
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">#</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Title</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Description</th>
                        <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Video</th>
                        {/* <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Thumbnail</th> */}
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {videos && videos.map((v, i) => {
                        return (
                            <tr key={i}>


                                <td className="border border-gray-300 px-4 py-2">{i+1}</td>
                                <td className="border border-gray-300 px-4 py-2">{v.title}</td>
                                <td className="border border-gray-300 px-4 py-2">{v.description}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {v.video ? (
                                         <a
                                        href={v.video}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View Video
                                    </a>
                                    ):(<p>No video</p>)}
                                   
                                </td>
                               
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default UploadedVideos