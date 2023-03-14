
import { Box, Container } from "@mui/system";
import "./Home.css";

const Home = () => {
    return (
            <Container>
            <article >
                <header className="article-header">
                    <h1>React: Leaves CRUD Application</h1>
                </header>
            </article>
            <Box>
                <div>Content part</div>
            </Box>
            </Container>
    );
};

export default Home;