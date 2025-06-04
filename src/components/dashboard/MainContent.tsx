"use client"
import { useSidebar } from '@/utils/context/SidebarContext';
import React from 'react'

const MainContent = ({children}:{children: React.ReactNode, className?: string}) => {
      const { collapsed } = useSidebar();
  return (
    <main className={`flex-1 flex max-h-screen flex-col ${collapsed ? 'w-[calc(100%-72px)]' : 'w-[calc(100%-195px)]'}`}>{children}</main>
  )
}

export default MainContent