
import { useEffect,useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({movie, user, token}) =>{

  const [favorited, setFavorited] = useState();

  useEffect(() => {
    setFavorited(user.favouriteMovies.includes(movie.id)), [];
  })
  console.log(favorited);

  const handleFavourite = () => {
    console.log(user);
    fetch(
      `https://alexa-movie-universe.herokuapp.com/users/${user.username}/movies/${movie.id}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const handleUnfavourite = () => {
    console.log(user);
    fetch(
      `https://alexa-movie-universe.herokuapp.com/users/${user.username}/movies/${movie.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert(movie.title + ' has been successfully deleted from Favorites List!');
        localStorage.setItem('user', JSON.stringify(data));
        window.location.reload();       
      })      
      .catch((error) => {
        console.log(error);
      });
  };


  return (
     <Card className="h-100">
      <Card.Img variant="top" src={movie.image}/>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Title>{movie.director.name}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link"> Open </Button>
        </Link>
        {favorited &&
          <Button onClick={() => handleUnfavourite(movie.id)} variant='outline-danger' type='submit' shape='rounded-pill' > - Favourite</Button>
        }
        {!favorited &&
          <Button onClick={() => handleFavourite(movie.id)} variant='outline-success' type='submit' shape='rounded-pill' size='small'> + Favourite</Button>
        }
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