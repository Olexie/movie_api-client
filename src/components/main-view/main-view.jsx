import PropTypes from "prop-types";

import {useState, useEffect} from "react";
import {MovieCard} from'../MovieCard';
import {MovieView} from "../MovieView/movie-view";


export const MainView = () => {
    const[movies, setMovie] = useState([ ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() =>{
        fetch("https://alexa-movie-universe.herokuapp.com/movies")
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
    }, []);

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
    </div>
    );
}