'use client';
import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { WbSunny, Cloud, Opacity, Air, WaterDrop, ThunderstormOutlined } from "@mui/icons-material";
import Navbar from "../../components/Navbar";

const API_KEY = "5a592ae2e46842b0a21131647252801";
const CITIES = ["Delhi", "Mumbai", "Bangalore", "Kolkata","jabalpur","pune"];

const getWeatherIcon = (condition: string) => {
  if (condition.includes("Sunny")) return WbSunny;
  if (condition.includes("Cloud")) return Cloud;
  if (condition.includes("Rain")) return ThunderstormOutlined;
  if (condition.includes("Humid")) return WaterDrop;
  return WbSunny;
};

const Home = () => {
  const [citiesData, setCitiesData] = useState<
    { name: string; temp: number; condition: string; humidity: number; windSpeed: number; icon: any }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const responses = await Promise.all(
          CITIES.map((city) =>
            fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
          )
        );
        const data = await Promise.all(responses.map((res) => res.json()));

        const formattedData = data.map((city) => ({
          name: city.location.name,
          temp: city.current.temp_c,
          condition: city.current.condition.text,
          humidity: city.current.humidity,
          windSpeed: city.current.wind_kph,
          icon: getWeatherIcon(city.current.condition.text),
        }));

        setCitiesData(formattedData);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      <Navbar />
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 4, marginTop: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              Weather Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Real-time weather updates for major Indian cities
            </Typography>
          </Box>

          {loading ? (
            <Typography textAlign="center">Loading...</Typography>
          ) : error ? (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          ) : (
            <Grid container spacing={3} sx={{ mb: 6 }}>
              {citiesData.map((city) => {
                const Icon = city.icon;
                return (
                  <Grid item xs={12} sm={6} md={3} key={city.name}>
                    <Card
                      elevation={2}
                      sx={{
                        height: "100%",
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                          <Typography variant="h6" component="h2">
                            {city.name}
                          </Typography>
                          <Icon sx={{ color: "primary.main", fontSize: 32 }} />
                        </Box>
                        <Typography variant="h3" component="div" sx={{ mb: 2 }}>
                          {city.temp}°C
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                          {city.condition}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Opacity sx={{ fontSize: 20, mr: 0.5, color: "info.main" }} />
                            <Typography variant="body2">{city.humidity}%</Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Air sx={{ fontSize: 20, mr: 0.5, color: "info.main" }} />
                            <Typography variant="body2">{city.windSpeed} km/h</Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Home;
