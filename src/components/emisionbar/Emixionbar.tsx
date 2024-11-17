import './Emixionbar.css'
import { getTokenInfo } from '../../utils/api'
import { useEffect, useState } from 'react'

interface TokenInfoResponse {
    data: {
        community: number;
        mined: number;
    };
}


function Emisionbar() {
    const [userCurrentPercent, setUserCurrentPercent] = useState<number>(0)

    useEffect(() => {
        const tokens = async () => {
            try {
                const response = await getTokenInfo();
                const data = response as TokenInfoResponse; // Type assertion
                const userTokensPool = data.data.community;
                const mined = data.data.mined;
                setUserCurrentPercent((mined * 95) / userTokensPool);
            } catch (error) {
                console.error("Error fetching token info:", error);
            }
        };
        tokens();
    }, []);
    
    
    return (
        <div className="emisionbar">
            <div className="emisionbar__developers"></div>
            <div style={{width: `${userCurrentPercent}%`}} className="emisionbar__users"></div>
        </div>
    )
}

export default Emisionbar