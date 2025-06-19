import Footer from '@/components/Footer';
import PublicHeader from '@/components/PublicHeader';

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
