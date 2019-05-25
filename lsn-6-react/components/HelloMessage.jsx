const HelloMessage = () => (
  <>
    <style jsx>{`
      .container {
        width: 600px;
        height: 100px;
        border: 1px solid black;
        margin: 0 auto;
        background-color: #F0F0F0;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
        
      }
      `}</style>
    <div className="container">
      <h1>React with streams</h1>
    </div>
  </>
);

export default HelloMessage;
