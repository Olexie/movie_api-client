import{ useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function UpdateView(props) {
  const storedToken = localStorage.getItem('token');
  const { user } = props;
  const [name_, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  
  const [token] = useState(storedToken ? storedToken : null);
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name:name_,
      username: username,
      password: password,
      email: email,
      birthday: birthday,
      favouriteMovies:[]
    };

    fetch(`https://alexa-movie-universe.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
         'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    }).then((response) => {
      if (response.ok) {
        alert("Profile update success!");        
        window.open('/users/:username', '_self');
      } else {
        alert("Profile update failed");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>

        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.name}                      
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>


        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.username}            
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>
    
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

    
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            defaultValue={user.birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="warning" type="submit">
        Update Profile
        </Button>

    </Form>
  );
};
