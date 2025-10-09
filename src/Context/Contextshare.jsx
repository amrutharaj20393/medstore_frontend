import React, { createContext, useState } from 'react'
export const searchKeyContext = createContext("")
export const allMedAddContext = createContext("")
export const cartMedDetContext = createContext("")
export const cartStatusContext = createContext("")
export const quantityContext = createContext("")
function Contextshare({ children }) {
    const [searchKey, setSearchKey] = useState("")
    const [allMedAddStatus, setAllMedAddStatus] = useState({})
    const [cartmedDet, setCartMedDt] = useState([])
    const [cartStatus, setCartstatus] = useState({})
    const [quantityStatus, setQuantityStatus] = useState([])

    return (
        <div>
            <cartStatusContext.Provider value={{ cartStatus, setCartstatus }}>
                <cartMedDetContext.Provider value={{ cartmedDet, setCartMedDt }}>
                    <allMedAddContext.Provider value={{ allMedAddStatus, setAllMedAddStatus }}>
                        <quantityContext.Provider value={{ quantityStatus, setQuantityStatus }}>
                            <searchKeyContext.Provider value={{ searchKey, setSearchKey }}>
                                {
                                    children
                                }
                            </searchKeyContext.Provider>
                        </quantityContext.Provider>
                    </allMedAddContext.Provider>
                </cartMedDetContext.Provider>
            </cartStatusContext.Provider>
        </div>
    )
}

export default Contextshare