import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
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
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };