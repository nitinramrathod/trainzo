import MainContent from "@/components/dashboard/MainContent";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { SidebarProvider } from "@/utils/context/SidebarContext";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>

    <div className="flex min-h-screen ">
      <SideBar />
      <MainContent>
        <Header />
        <div className="p-4 bg-indigo-50 flex-1 overflow-y-auto">
          {children}
        </div>
      </MainContent>
    </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
