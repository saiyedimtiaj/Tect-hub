import React from 'react'
import Navbar from '@/components/shared/Navbar'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default layout
