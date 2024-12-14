import { useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CardList from "../components/cardList";
import { fetchCats } from "../api/catApi";

const Home = () => {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagesNumber, setImagesNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleRandomClick = async () => {
    if (imagesNumber < 1 || imagesNumber > 10) {
      setError("Please enter a number between 1 and 10.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchCats(imagesNumber);
      setCats(data);
    } catch (err) {
      setError("Cannot fetch cat images. Please try again.");
    } finally {
      setLoading(false);
    }
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
