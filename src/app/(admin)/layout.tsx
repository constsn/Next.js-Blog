import AdminHeader from '@/components/AdminHeader';

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AdminHeader />
      <div className="mt-10">{children}</div>
    </>
  );
};

export default DashBoardLayout;
