import Footer from '@/components/layout/Footer';
import PublicHeader from '@/components/layout/PublicHeader';

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
