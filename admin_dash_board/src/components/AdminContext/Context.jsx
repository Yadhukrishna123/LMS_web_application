import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const AdminContext = React.createContext()
export const Context = (props) => {
    let [auth, setAuth] = useState(false)
    const [showPopup, setShowPopup] = useState(false)
    const [schedules, setSchedules] = useState([])
    const [scheduleId, setScheduleId] = useState("")

    const isAdminLogedIn = (isAuthenticated) => {
        console.log(isAuthenticated);
        setAuth(isAuthenticated)

    }

    const handleShowPopup = (v, id) => {
        setShowPopup(v)
        console.log(id);
        setScheduleId(id)
    }



    const getAllSchedule = async () => {
        let res = await axios.get("http://localhost:8080/api/v1/get_all_schedule")
        setSchedules(res.data.schedules)

    }
    useEffect(() => {
        getAllSchedule()
    }, [])
    console.log(schedules);

    return (
        <AdminContext.Provider value={{ isAdminLogedIn, auth, handleShowPopup, showPopup, setShowPopup, schedules, scheduleId }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default Context