import React, { Component } from "react";
import axios from "axios";
import { Container, Grid } from "@material-ui/core";
import "./sass/app.scss";
import image from "./images/image.png";

import { Cards, Chart, CountryPicker } from "./components";

class App extends Component {
  state = {
    data: {},
    country: "",
  };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = (country) => {
    let url = "https://covid19.mathdro.id/api";
    if (country) {
      url = `${url}/countries/${country}`;
    }
    axios.get(url).then((res) => {
      this.setState({
        data: res.data,
        country: country,
      });
    });
  };

  handleCountryChange = (country) => {
    this.fetchData(country);
  };

  render() {
    return (
      <Container maxWidth="md">
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={5}>
            {<img className="image" src={image} alt="COVID-19" />}
          </Grid>
        </Grid>
        <Cards data={this.state.data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={this.state.data} country={this.state.country} />
      </Container>
    );
  }
}

export default App;
