import React, { useState, useEffect } from 'react';

import { Button, Col, Container, Row } from 'react-bootstrap';

import { FavouriteMoviesView } from './favourite-movie-view';
import { UpdateView } from './update-view';


export function ProfileView(props) {
  const [ user, setUser ] = useState(props.user);
  const [ movies, setMovies ] = useState(props.movies);
  const [ favouriteMovies, setFavouriteMovies ] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const getUser = () => {
    fetch(`https://alexa-movie-universe.herokuapp.com/users/${currentUser.username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json())
    .then(data => {
      console.log(data.favouriteMovies)
      setUser(data);
      setFavouriteMovies(data.favouriteMovies)
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])

  const handleDelete = () => {
    fetch(`https://alexa-movie-universe.herokuapp.com/users/${currentUser.username}`, {
      headers: { Authorization: `Bearer ${token}`},
      method: 'DELETE'
    })
    .then(() => {
      alert(`The account ${user.username} was successfully deleted.`)
      localStorage.clear();
    }).
    catch(error => console.error(error))
  }

  return (
    <Container id="profile-form">
      <Row><h4>Your profile</h4></Row>
      <Row>
        <Col className="label">Username:</Col>
        <Col className="value">{user.username}</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Password:</Col>
        <Col className="value">*******</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Email:</Col>
        <Col className="value">{user.email}</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Birthday:</Col>
        <Col className="value">{user.birthday}</Col>
        </Row>
        <Row className="mt-5"><h4>Your favourite movies</h4></Row>
        <Row className="mt-3">
          <FavouriteMoviesView 
          movies={movies} 
          favouriteMovies={favouriteMovies} 
          currentUser={currentUser} 
          token={token}/>
        </Row>
        <UpdateView user={user}/>
        <Button className="d-block mt-5" variant="danger" onClick={handleDelete}>Delete profile</Button>
    </Container>
  )
}
