import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import { Button, Container, Row, Col } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom'; 
import LoadingIndicator from '../components/LoadingInicator';

export default function Profile() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        setUserData({
          name: `${data.user.firstName} ${data.user.lastName}`, 
          email: data.user.email,
          mobile: data.user.mobileNo
        });
      }
    })
    .finally(() => setLoading(false)); 
  }, []);

  if (loading) return <LoadingIndicator />;

  return (
    <Container className="d-flex flex-column align-items-center py-5">
      <Row className="w-100">
        <Col className="bg-primary text-white p-5 rounded">
          <h2>Profile</h2>
          <h4>{userData.name}</h4>
          <hr />
          <div>
            <h5>Contacts</h5>
            <ul className="list-unstyled">
              <li>
                <strong>Email: </strong>{userData.email}
              </li>
              <li>
                <strong>Mobile No: </strong>{userData.mobile}
              </li>
            </ul>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-center w-100"> 
        <Button className="mt-3 bg-purple text-white" onClick={() => navigate('/reset-password')}>
          Reset Password
        </Button>
      </div>
    </Container>
  );
}
