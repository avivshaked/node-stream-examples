import NavBar from './NavBar';

const Page = ({children}) => (
  <>
    <style jsx>{`
      .page {
        width: 100vw;
        height: auto;
        display: block;
        margin: 0 auto;
        
      }
      .
    `}</style>
      <style global jsx>{`
          body {
            margin: 0;
            padding: 0;
          }   
      `}</style>
    <div className="page">
        <NavBar/>
      {children}
    </div>
    </>
);

export default Page;
