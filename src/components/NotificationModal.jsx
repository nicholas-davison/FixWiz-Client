import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';


const NotificationModal = ({ show, handleClose, notifications }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {notifications.map(notification => (
            <li key={notification.id}>
              <a href={notification.link}>{notification.message}</a>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const NotificationFetcher = () => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:8000/notifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${JSON.parse(localStorage.getItem("fix_token")).token}` 
          }
        });
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setNotifications(data);
          setShowModal(true);
        }

      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications()

    const intervalId = setInterval(fetchNotifications, 10000)

    return () => clearInterval(intervalId)
  }, []);

  const handleClose = async () => {
    try {
      // Update all notifications as read
      for (const notification of notifications) {
        await fetch(`http://localhost:8000/notifications/${notification.id}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${JSON.parse(localStorage.getItem("fix_token")).token}`
          },
          body: JSON.stringify({ read: true })
        });
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error updating notifications:', error);
    }
  }

  return (
    <>
      <NotificationModal show={showModal} handleClose={handleClose} notifications={notifications} />
    </>
  );
};

export default NotificationFetcher;
