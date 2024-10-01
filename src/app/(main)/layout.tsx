import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default layout
