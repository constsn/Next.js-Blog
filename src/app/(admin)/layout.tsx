import AdminHeader from '@/components/admin/AdminHeader';

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AdminHeader />
      <div className="mt-2">{children}</div>
    </>
  );
};

export default DashBoardLayout;
