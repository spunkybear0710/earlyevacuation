"use client";

import React from 'react';
import { Box, Card, CardContent, Container, Grid, Typography, Paper, Chip, Divider } from '@mui/material';
import { WbSunny, Cloud, Opacity, Air, WaterDrop, Warning, ThunderstormOutlined } from '@mui/icons-material';
import Navbar from '../components/Navbar';

const Home = () => {

  const cities = [
    {
      name: 'Delhi',
      temp: 32,
      condition: 'Partly Cloudy',
      humidity: 45,
      windSpeed: 12,
      icon: Cloud
    },
    {
      name: 'Mumbai',
      temp: 29,
      condition: 'Rainy',
      humidity: 80,
      windSpeed: 15,
      icon: ThunderstormOutlined
    },
    {
      name: 'Bangalore',
      temp: 26,
      condition: 'Sunny',
      humidity: 55,
      windSpeed: 8,
      icon: WbSunny
    },
    {
      name: 'Kolkata',
      temp: 30,
      condition: 'Humid',
      humidity: 75,
      windSpeed: 10,
      icon: WaterDrop
    }
  ];

  const newsItems = [
    {
      title: 'Heavy Rainfall Warning',
      description: 'Mumbai and coastal regions expected to receive heavy rainfall in the next 48 hours.',
      severity: 'warning',
      date: '2 hours ago'
    },
    {
      title: 'Heat Wave Alert',
      description: 'Delhi NCR experiencing severe heat wave conditions. Temperature expected to rise further.',
      severity: 'error',
      date: '5 hours ago'
    },
    {
      title: 'Cyclone Update',
      description: 'Tropical cyclone forming in Bay of Bengal, may affect eastern coastal regions.',
      severity: 'info',
      date: '1 day ago'
    }
  ];

  return (
    <div><Navbar/>
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 4, marginTop: 8 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Weather Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Real-time weather updates for major Indian cities
          </Typography>
        </Box>

        {/* Weather Cards Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {cities.map((city) => {
            const Icon = city.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={city.name}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" component="h2">
                        {city.name}
                      </Typography>
                      <Icon sx={{ color: 'primary.main', fontSize: 32 }} />
                    </Box>
                    <Typography variant="h3" component="div" sx={{ mb: 2 }}>
                      {city.temp}°C
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {city.condition}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Opacity sx={{ fontSize: 20, mr: 0.5, color: 'info.main' }} />
                        <Typography variant="body2">{city.humidity}%</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Air sx={{ fontSize: 20, mr: 0.5, color: 'info.main' }} />
                        <Typography variant="body2">{city.windSpeed} km/h</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Weather News Section */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Latest Weather News
          </Typography>
          <Grid container spacing={3}>
            {newsItems.map((news, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: '100%',
                    transition: 'all 0.3s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Warning sx={{ color: `${news.severity}.main`, mr: 1 }} />
                    <Typography variant="h6" component="h3">
                      {news.title}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography color="text.secondary" paragraph>
                    {news.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={news.severity.toUpperCase()}
                      color={news.severity as 'warning' | 'error' | 'info'}
                      size="small"
                      sx={{ textTransform: 'capitalize' }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {news.date}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
    </div>
  );
};

export default Home;
