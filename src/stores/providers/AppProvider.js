import { useState } from "react"
import { AppContext } from "../contexts/AppContext"

const AppProvider = ({children})=>{
    const [data, setData] = useState({
        keyword: undefined,
        category: -1
    })
    return (
        <AppContext.Provider value={[data, setData]}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider