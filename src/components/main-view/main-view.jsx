import {useState} from "react";
import {MovieCard} from'../MovieCard';
import {MovieView} from "../MovieView/movie-view";


export const MainView = () => {
    const[movie, setMovie] = useState([
        {id: 1,
         title:"The Incredible Hulk",
         director:"Louis Leterrier",
         image:"https://m.media-amazon.com/images/I/71Y0aoTDEJL._AC_SL1500_.jpg"
        },
        {id: 2,
         title:"Iron Man",
         director:"Jon Favreau",
         image:"https://cdn.shopify.com/s/files/1/0037/8008/3782/products/IMG_4737_1-550469_6ad2415d-59de-4f0c-8cb7-a3f1be291340.jpg?v=1656424801"
        },
        {id: 3, 
        title: "Iron Man 2",
        director:"Jon Favreau",
        image:"https://cdn.hmv.com/r/w-640/hmv/files/4c/4c0df4e9-4883-44c0-bfd7-5c9135381a9f.jpg"
        },
        {id: 4, 
        title:"Thor",
        director:"Kenneth Branagh",
        image:"https://m.media-amazon.com/images/M/MV5BOGE4NzU1YTAtNzA3Mi00ZTA2LTg2YmYtMDJmMThiMjlkYjg2XkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_.jpg"
        }
    ]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return(
             <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)}
                />
        );
      }

    
    if (movie.length === 0){
        return <div>The list is empty</div>
    } 
    return (
    <div>
        {movie.map((movie) => (
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