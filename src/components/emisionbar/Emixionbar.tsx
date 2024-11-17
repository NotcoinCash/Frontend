import './Emixionbar.css'
import { getTokenInfo } from '../../utils/api'
import { useEffect, useState } from 'react'

function Emisionbar() {
    const [userCurrentPercent, setUserCurrentPercent] = useState<number>(0)

    useEffect(() => {
        const tokens = async () => {
            const response = await getTokenInfo()
            const userTokensPool = response.data.community
            const mined = response.data.mined
            setUserCurrentPercent((mined * 95) / userTokensPool)
        }
        tokens()
    }, [])
    
    return (
        <div className="emisionbar">
            <div className="emisionbar__developers"></div>
            <div style={{width: `${userCurrentPercent}%`}} className="emisionbar__users"></div>
        </div>
    )
}

export default Emisionbar