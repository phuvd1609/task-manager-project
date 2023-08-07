import './App.css';
import ContentContainer from './components/ContentContainer';
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email
  return (
    <div className="app">
      <div className='list-header'>
        <h1>Hello {userEmail != undefined ? userEmail : ""}</h1>
      </div>
      {authToken && <ContentContainer authToken={authToken}></ContentContainer>}
      {!authToken && <Auth></Auth>}
    </div>
  );
}

export default App;
