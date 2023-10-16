import NavigaionSidebar from "@/components/navigation/NavigaionSidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dynamic">
      <div className="md:flexCol fixed inset-y-0 z-30 hidden h-full w-[72px]">
        <NavigaionSidebar />
      </div>

      <main className="h-full md:pl-[72px]">{children}</main>
    </div>
  );
};
export default MainLayout;
