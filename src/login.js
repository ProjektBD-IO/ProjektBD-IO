import React, { useState } from "react";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // stan zalogowania

  const handleSubmit = async (event) => {
   
    event.preventDefault();
    try {
      const response = await fetch(`${window.API_URL}/api/services/controller/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: "cors",
        body: JSON.stringify({
          nickname: username,
          password: password
        })
      });
      const data = await response.json();
      console.log(data);
      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('username', data.username);
      setLoggedIn(true); // ustawienie stanu zalogowania na true
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!loggedIn ? (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <br />
          <button type="submit">Log in</button>
        </form>
      ) : (
        <div>
          <p>You are now logged in!</p>
          <p>Welcome, {localStorage.getItem('username')}!</p>
        </div>
      )}
    </>
  );
}

export default LoginForm;