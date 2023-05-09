
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({movie, onMovieClick}) =>{
    return (
     <Card className="h-100">
      <Card.Img variant="top" src={movie.image}/>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Title>{movie.director.name}</Card.Title>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };