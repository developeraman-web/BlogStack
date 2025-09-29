import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/AppSidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <SidebarProvider>
      <Topbar />
      <AppSidebar />
      <SidebarInset>
        <main className="w-full transition-all duration-700 ease-in">
          <div className="w-full min-h-[calc(100vh-40px)] py-24 md:px-10 px-3 ">
            <Outlet />
          </div>
          <Footer />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
