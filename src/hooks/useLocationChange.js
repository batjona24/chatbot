import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useLocationChange = (action) => {
    const location = useLocation()
    useEffect(() => {
        if (typeof action === 'function') {
            action(location)
        }
    }, [location])
}

export default useLocationChange
