
import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import { useState } from 'react';
const auth = getAuth(app);
function App() {
  const [use, setUse] = useState({})
  const provider = new GoogleAuthProvider();
  const gitprovider = new GithubAuthProvider();
  const handleclikedsignin = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUse(user)
        console.log(use);
      })
      .catch(error => {
        console.log('error', error);
      })

  }
  const handlegit = () => {
    signInWithPopup(auth, gitprovider)
      .then(result => {
        const user = result.user;
        setUse(user);
        console.log(use);
        console.log(user);
      })
      .catch(error => {
        console.error('error', error);
      })
  }
  const handlesignout = () => {
    signOut(auth)
      .then(() => {
        setUse({})
      })
      .catch(error => {
        console.log('error', error);
        // setUse({})
      })
  }
  return (
    <div className="App">
      {use.uid ?
        <button onClick={handlesignout}>Sign out</button>
        : <div> <button onClick={handleclikedsignin}>googl e sign in</button>
          <button onClick={handlegit}>git sign in</button>
        </div>}
      {use.uid && <div>
        <h1>Name:{use.displayName}</h1>
        <p>Email:{use.uid}</p>
      </div>}
    </div>
  );
}

export default App;
