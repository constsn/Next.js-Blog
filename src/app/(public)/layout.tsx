import PublicHeader from '@/components/PublicHeader';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicHeader />
      {children}
    </>
  );
};

export default PublicLayout;
