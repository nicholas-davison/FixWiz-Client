import { Card } from "react-bootstrap"
import "./intro.css"

export const Home = () => {
    return (
        <Card className="intro-card mt-5">
            <Card.Body>
                <Card.Text className="intro-card-title">Welcome to FixWiz!</Card.Text>
                <Card.Text className="intro-card-text">Shidders full!" -<cite>Cousin Eddie</cite></Card.Text>
            </Card.Body>
        </Card>
    )
}