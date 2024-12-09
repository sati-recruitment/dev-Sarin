import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CardList from "../components/cardList";

const Home = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagesNumber, setImagesNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const apiKey =
    "live_UMIEHUqwTGnUFY8TiJrv60nSuK36A42ddgNtFcb9YWb4lsQgXUJGvfJ4xcJfnlqA";
  const apiUrl = "https://api.thecatapi.com/v1/images/search";

  const fetchCats = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          limit: imagesNumber,
          api_key: apiKey,
        },
      });
      setCats(response.data);
    } catch (err) {
      setError("Cannot fetch cat images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRandomClick = () => {
    if (imagesNumber < 1 || imagesNumber > 10) {
      setError("Please enter a number between 1 and 10.");
      return;
    }
    fetchCats();
  };

  return (
    <Stack spacing={2} padding={1} data-testid="main">
      <Typography variant="h3" component="h1">
        Cat Gallery
      </Typography>
      <Stack>
        <TextField
          fullWidth
          inputProps={{
            "data-testid": "images-number-field",
          }}
          label="Images Number"
          type="number"
          helperText={"Number should be between 1 and 10"}
          value={imagesNumber}
          onChange={(e) => setImagesNumber(Number(e.target.value))}
          error={!!error}
        />
        <Button
          data-testid="random-image-btn"
          disableElevation
          variant="contained"
          fullWidth
          onClick={handleRandomClick}
        >
          Random
        </Button>
      </Stack>
      {loading && (
        <Box sx={{ width: "100%" }} data-testid="loading-indicator">
          <LinearProgress />
        </Box>
      )}
      {error && <Typography color="error">{error}</Typography>}
      <CardList cats={cats} />
    </Stack>
  );
};

export default Home;
