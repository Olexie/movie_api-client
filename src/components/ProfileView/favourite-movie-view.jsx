import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, Col } from 'react-bootstrap';


export function FavouriteMoviesView(props) {
  const { movies, favouriteMovies, currentUser, token } = props;
  
  
  const favouriteMoviesList = movies.filter(m => {
    return favouriteMovies.includes(m.id)
  })

  console.log(favouriteMoviesList)

  const handleMovieDelete = (movieId) => {
    fetch(`https://alexa-movie-universe.herokuapp.com/users/${currentUser.username}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`},
      method: 'DELETE'
    })
    .then(() => {
      alert(`The movie was successfully deleted.`)
      window.open('/users/:username', '_self');
    }).
    catch(error => console.error(error))
  }

  return (
    <Fragment>
      {favouriteMoviesList.length === 0 ? (
          <p>You have no favourite movies yet.</p>
          ) : (
            favouriteMoviesList.map((movie) => {
              return (
              <Col key={movie.id} xs={10} sm={8} md={6} lg={4} >
                <Card id="movie-card">
                  <Link to={`/movies/${movie.id}`}>
                    <Card.Img variant="top" src={movie.image} />
                  </Link>
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>                    
                    <Link to={`/movies/${movie.id}`}>
                      <Button className="button" variant="outline-primary" size="sm">Open</Button>
                    </Link>
                    <Button 
                    className="button ml-2" 
                    variant="outline-primary" 
                    size="sm" onClick={()=> {handleMovieDelete(movie.id)}} >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              )
            })
          )
        }
    </Fragment>
  )
}
