import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from "axios";



export const AllCourseDetail = React.createContext()

export const Context = (props) => {
    const [user, setUser] = useState(null)
    const [authentication, setAuthentication] = useState(false)
    const [courseDetail, seCourseDetail] = useState([])


    useEffect(() => {
        const token = document.cookie.includes("token=")
        if (!token) return;
        const getMe = async () => {
            let res = await axios.get("http://localhost:8080/api/v1/me", {
                withCredentials: true
            })
            console.log(res);
            if (res.data.success) {
                setUser(res.data.user)
            }

        }
        getMe()
    }, [])

    const sentDataToCheckoutPage = (course) => {
        seCourseDetail(course)

    }



    return (
        <AllCourseDetail.Provider value={{authentication, user, sentDataToCheckoutPage, setUser, courseDetail }}>
            {props.children}
        </AllCourseDetail.Provider>
    )
}

export default Context