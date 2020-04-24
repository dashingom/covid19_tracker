import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Grid, NativeSelect, FormControl } from "@material-ui/core";

const CountryPicker = ({ handleCountryChange }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const url = "https://covid19.mathdro.id/api/countries";
    axios.get(url).then((res) => {
      setCountries(res.data.countries);
    });
  }, [setCountries]);
  return (
    <Container maxWidth="md" className="container">
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={4}>
          <FormControl>
            <NativeSelect
              defaultValue=""
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              <option value="">Global</option>
              {countries.map((country, i) => (
                <option key={i} value={country.name}>
                  {country.name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CountryPicker;
