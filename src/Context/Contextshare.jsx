import React, { createContext, useState } from 'react'
export const searchKeyContext = createContext("")
export const allMedAddContext = createContext("")
export const cartMedDetContext=createContext("")
export const cartStatusContext=createContext("")
function Contextshare({ children }) {
    const [searchKey, setSearchKey] = useState("")
    const [allMedAddStatus, setAllMedAddStatus] = useState({})
    const [cartmedDet,setCartMedDt]=useState([])
    const [cartStatus,setCartstatus]=useState({})


    return (
        <div>
            <cartStatusContext.Provider value={{cartStatus,setCartstatus}}>
            <cartMedDetContext.Provider value={{cartmedDet,setCartMedDt}}>
            <allMedAddContext.Provider value={{ allMedAddStatus, setAllMedAddStatus }}>
                <searchKeyContext.Provider value={{ searchKey, setSearchKey }}>
                    {
                        children
                    }
                </searchKeyContext.Provider>
            </allMedAddContext.Provider>
            </cartMedDetContext.Provider>
            </cartStatusContext.Provider>
        </div>
    )
}

export default Contextshare