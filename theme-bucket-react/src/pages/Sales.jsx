import { useNavigate, useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'

const Sales = () => {
    const { profile } = useOutletContext()

    const navigate = useNavigate()

    useEffect(() => {
        if (profile.role === 'BUYER') {
            navigate(`/profile/${profile.id}/become-a-seller`)
        }
    }, [])

    return (
        <div>Sales</div>
    )
}

export default Sales