import HelloMessage from '../components/HelloMessage';
import Page from '../components/Page';

const Index = () => (
  <Page>
    <HelloMessage/>
    <style jsx>{`
      display: block;
      text-align: center;
      font-size: 18px;
      margin: 20px;
    `}</style>
    <span>
      Currently no stream is used.
    </span>
  </Page>
);

export default Index
