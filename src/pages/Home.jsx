import { Card } from "react-bootstrap"
import "./intro.css"

export const Home = () => {
    const gifUrl = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnE3eW5kNzdvMWEyZ3J4c3d6cmt1MTFmajB0bDBmeG83bTNsODZiNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iEw1RZrUxNgQLdG38g/giphy.gif"
    return (
        <Card className="intro-card mt-5">
            <Card.Body>
                <Card.Text className="intro-card-title">Welcome to FixWiz!</Card.Text>
                <Card.Text className="intro-card-text">Connecting customers and fixers since 2024</Card.Text>
                <img src={gifUrl} alt="FixWiz Animation" className="intro-gif" />
            </Card.Body>
        </Card>
    )
}