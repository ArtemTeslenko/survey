import Link from 'next/link';

const MainScreen: React.FC = () => {
  return (
    <>
      <h1 className="main-title">Main page</h1>

      <Link href="/survey/id-1" className="redirection-link">
        To survey
      </Link>
    </>
  );
};

export default MainScreen;
