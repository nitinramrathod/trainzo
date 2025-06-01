import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import React from 'react'

interface LayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <div className="flex">
                <SideBar></SideBar>
                <main className='flex-1'>
                    <Header/>
                    <div className='p-4 bg-[#fcfeff] min-h-[600px]'>
                    {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout