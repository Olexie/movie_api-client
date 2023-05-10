
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
    return (
      <div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>director: </span>
          <span>{movie.director.name}</span>
        </div>
        <div>
            <span>director DOB:</span>
            <span>{movie.director.birth?.toLocaleDateString()}</span>
        </div>
        <Link to={`/`}>
          <button className="back-button">Back</button>
        </Link>
      </div>
    );
  };