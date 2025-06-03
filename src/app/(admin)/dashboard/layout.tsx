import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import React from 'react'

interface LayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <div className="flex min-h-screen ">
                <SideBar/>
                <main className='flex-1 flex max-h-screen flex-col'>
                    <Header/>
                    <div className='p-4 bg-indigo-50 flex-1 overflow-y-auto'>
                    {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout