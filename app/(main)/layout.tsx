import NavigationSidebar from "@/components/navigation/NavigationSidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dynamic">
      <aside className="md:flexCol fixed inset-y-0 z-30 hidden h-full w-[72px]">
        <NavigationSidebar />
      </aside>

      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
};
export default MainLayout;
