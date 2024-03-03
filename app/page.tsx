// pages/index.js
'use client';
import Link from 'next/link';
import { Container, Typography, Button, Grid } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenue!
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" gutterBottom>
            Que souhaitez-vous faire ?
          </Typography>
        </Grid>
        <Grid item>
          <Link href="/connexion" passHref>
            <Button variant="contained" color="primary" size="large">
              Se connecter
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/inscription" passHref>
            <Button variant="contained" color="primary" size="large">
              S'inscrire
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
