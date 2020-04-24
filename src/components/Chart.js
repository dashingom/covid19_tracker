import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid } from "@material-ui/core";
import { Line, Bar } from "react-chartjs-2";

const Chart = ({
  data: { confirmed, recovered, deaths, lastUpdate },
  country,
}) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const url = "https://covid19.mathdro.id/api/daily";
    axios.get(url).then((res) => {
      let modifiedData = res.data.map((dailyData) => ({
        confirmed: dailyData.confirmed.total,
        deaths: dailyData.deaths.total,
        date: dailyData.reportDate,
      }));
      setDailyData(modifiedData);
    });
  }, []);

  const lineChart =
    dailyData.length > 0 ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [
            {
              data: dailyData.map(({ confirmed }) => confirmed),
              label: "Infected",
              borderColor: "#333fff",
              fill: true,
            },
            {
              data: dailyData.map(({ deaths }) => deaths),
              label: "Deaths",
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
              fill: true,
            },
          ],
        }}
      />
    ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;
  return (
    <Container maxWidth="md" className="container">
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          {country ? barChart : lineChart}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chart;
