import React from "react";

const Link = ({ href, text }) => (
  <a href={href} style={{
    color: 'inherit',
    textDecoration: 'none',
  }}>{text}</a>
);

const Li = ({ children }) => (
  <li style={{
    textAlign: 'center',
    alignItems: 'center',
    padding: '15px 40px',
    fontSize: '18px',
    color: 'white',
    borderLeft: '1px solid #033b81',
    borderRight: '1px solid #015cb9',
    cursor: 'pointer',
  }}>
    {children}
  </li>
);


const NavBar = () => (
  <div>
    <nav style={{
      borderBottom: '1px solid black',
      backgroundColor: '#004b80'
    }}>
      <ol style={{
        margin: '0',
        listStyleType: 'none',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'start',
        alignItems: 'center',
      }}>
        <Li>
          <Link href="/" text="No streams" />
        </Li>
        <Li>
          <Link href="/stream" text="With streams" />
        </Li>
        <Li>
          <Link href="/stream-delay/0" text="Streams with delay" />
        </Li>
      </ol>
    </nav>
  </div>
);

export default NavBar;
