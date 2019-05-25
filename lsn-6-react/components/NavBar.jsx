import Link from 'next/link';

const NavBar = () => (
  <div>
    <style jsx>{`
    nav {
      border-bottom: 1px solid black;
      background-color: #004b80;
    }
    
    ol {
        margin: 0;
        list-style-type: none;
        display: flex;
        flex-flow: row nowrap;
        justify-content: start;
        align-items: center;
        
    }
    
    li {
        text-align: center;
        align-items: center;
        padding: 15px 40px;
        font-size: 18px;
        color: white;
        border-left: 1px solid #033b81;
        border-right: 1px solid #015cb9;
        cursor: pointer;
    }
    
    li:hover {
        background-color: #2550b2;
    }
    
    a {
      color: inherit;
      text-decoration: none;
    }

    `}</style>
    <nav>
      <ol>
        <li>
          <Link href="/">
            <a>No Stream</a>
          </Link>
        </li>
        <li>
          <Link href="/with-streams">
            <a>With Streams</a>
          </Link>
        </li>

      </ol>
    </nav>
  </div>
);

export default NavBar;
