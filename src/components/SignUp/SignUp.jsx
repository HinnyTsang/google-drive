import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context';

const SignUp = () => {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nevigate = useNavigate();


  function handleSubmit(e) {
    e.preventDefault();

    // check if the pass word is the same.
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }
    else if (passwordRef.current.value.length < 6) {
      return setError('Password should be at least 6 characters');
    }

    setError('');
    setLoading(true);
    signup(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        nevigate('/');
      })
      .catch(() => {
        setError('Failed to create an account');
      });

    setLoading(false);
  }

  return (
    <>
      <Card >
        <Card.Body>
          <h2 className='text-center mb-4'>
                        Sign Up
          </h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password confirm</Form.Label>
              <Form.Control type='password' ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-100 mt-2' type='submit'>Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </>
  );
};

export default SignUp;