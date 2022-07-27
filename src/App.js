import './App.css';
import {useState} from "react";
import {Context} from "./context";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyCl-TPlyOwaYLh0H8OTPoH_Ki-0K_UG56A",
  authDomain: "react-films-2524b.firebaseapp.com",
  projectId: "react-films-2524b",
  storageBucket: "react-films-2524b.appspot.com",
  messagingSenderId: "771046017414",
  appId: "1:771046017414:web:be1c08ebf14e29bef44407",
  measurementId: "G-LXZGSEEBG8"
});

const firestore = firebase.firestore();
const auth = firebase.auth();

function App() {

  const [films, setFilms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchItem, setSearchItem] = useState('')
  const [page, setPage] = useState(1)
  const [searchedFilms, setSearchedFilms] = useState([])


  return (
    <Context.Provider value={{
      films, setFilms, isLoading, setIsLoading,
      searchItem, setSearchItem, page, setPage,
      searchedFilms, setSearchedFilms, firestore, auth
    }}>
      <BrowserRouter>
        <NavBar/>
        <AppRouter/>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
