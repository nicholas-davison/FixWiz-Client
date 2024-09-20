import { useEffect } from 'react';
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
              <a href={notification.link} onClick={handleClose}>{notification.message}</a>
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
  )
}


const NotificationFetcher = ({notifications, setNotifications, showModal, setShowModal , shouldPoll, setShouldPoll}) => {

  useEffect( () => {
    const tokenData = localStorage.getItem("fix_token");
    if (tokenData) {
      const { user_type } = JSON.parse(tokenData);
      if (user_type === 'customer') {
        setShouldPoll(true);
      } else {
        setShouldPoll(false);
      }
    } else {
      setShouldPoll(false);
    }
  }, []
  )

  useEffect(() => {
    if (!shouldPoll) return

    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://fixwiz-api-ui6w7.ondigitalocean.app/notifications', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${JSON.parse(localStorage.getItem("fix_token")).token}` 
          }
        });
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          setNotifications(data);
          setShowModal(true);
        }

      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }

    fetchNotifications()

    const intervalId = setInterval(fetchNotifications, 7000)

    return () => clearInterval(intervalId)
  }, [shouldPoll]);

  const handleClose = async () => {
    try {
      for (const notification of notifications) {
        await fetch(`https://fixwiz-api-ui6w7.ondigitalocean.app/notifications/${notification.id}`, {
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

export default NotificationFetcher
