import PropTypes from "prop-types";

import {useState, useEffect} from "react";
import {MovieCard} from'../MovieCard';
import {MovieView} from "../MovieView/movie-view";
import { LoginView } from "../LoginView/login-view";
import { SignupView } from "../SignupView/signup-view";



export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const[movies, setMovie] = useState([ ]);

    const [selectedMovie, setSelectedMovie] = useState(null);


    useEffect(() =>{
        if (!token) {
            return;
          }
      
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

    if (!user) {
        return(
        <> 

        <LoginView onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
         } } />
         or
        <SignupView />

      </>
    );
    }

    if (selectedMovie) {
        return(
             <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}
                />
        );
      }

    
    if (movies.length === 0){
        return <div>The list is empty</div>
    } 
    return (
    <div>
        {movies.map((movie) => (
            <MovieCard 
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
            }}
             />
        ))}   
       <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
    </div>
    );
}
