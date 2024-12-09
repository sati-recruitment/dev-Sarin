import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface CardListProps {
  cats: Cat[];
}

const CardList = ({ cats }: CardListProps) => {
  return (
    <Grid container spacing={1} data-testid="images-list">
      {cats.map((cat) => (
        <Grid item xs={12} md={4} data-testid="image-item" key={cat.id}>
          <Card variant="outlined">
            <CardMedia
              component="img"
              alt="image-alt"
              height={300}
              width="100%"
              image={cat.url}
              loading="lazy"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Size: {cat.width} x {cat.height} px
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardList;
