import PropTypes from "prop-types";

import {useState, useEffect} from "react";
import {MovieCard} from'../MovieCard';
import {MovieView} from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";

import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {
  /*  const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const[movies, setMovie] = useState([ ]);

const [selectedMovie, setSelectedMovie] = useState(null); */

   const[movies, setMovie] = useState([]);
   const[user, setUser] = useState(null);


    useEffect(() =>{
    /*    if (!token) {
            return;
          } */
      
        fetch("https://alexa-movie-universe.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data)=>{
            console.log(data);
           const movieFromApi =data.map((doc) => {
            return{
                id: doc._id,
                title: doc.title,
                image: doc.image,
                director: {
                    ...doc.director,
                    birth: doc.director.birth ? new Date(doc.director.birth) : null,
                }
           };
           }) ;
           console.log(movieFromApi);
           setMovie(movieFromApi)
        });
    }, [token]);


    return (
        <Row className="justify-content-md-center"> 
             {!user ? (
        <> 
        <Col md={5}>
        <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
         } } />
         </Col>
         or
        <Col md={5}>
        <SignupView />
        </Col>

      </>
    ) : selectedMovie ? (
        <Col md={8} style={{ border: "1px solid black" }}>
        <MovieView 
        style={{ border: "1px solid green" }}
        movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}/>
        </Col>
   ) : movies.length === 0 ?(
    <div>The list is empty</div>
    ) : (
        <div>
            <Row>
            {movies.map((movie) => (
                <Col key={movie.id} md={3}>
                <MovieCard                 
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                 />
                </Col>
            ))}  
            </Row> 
           <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>
        )}
        </Row>
    );

}
