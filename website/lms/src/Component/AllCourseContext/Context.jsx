import React, { useState } from 'react'


export const AllCourseDetail = React.createContext()

export const Context = (props) => {
    const [user, setUser] = useState([])
    const [authentication, setAuthentication] = useState(false)
    const [courseDetail, seCourseDetail] = useState([])


    const getUserData = (user, authentication) => {
        setUser(user)
        setAuthentication(authentication)
        // console.log(user);
        // console.log(authentication);

    }
    const userLogout = () => {
        setUser([])
        setAuthentication(false)
    }

    const sentDataToCheckoutPage = (course) => {
        seCourseDetail(course)

    }



    return (
        <AllCourseDetail.Provider value={{ getUserData, authentication, userLogout, user, sentDataToCheckoutPage , courseDetail}}>
            {props.children}
        </AllCourseDetail.Provider>
    )
}

export default Context