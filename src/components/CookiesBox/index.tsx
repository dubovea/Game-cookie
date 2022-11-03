import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Cookie from "../Cookie";

import { cookieSelector } from "../../redux/cookies/selectors";

const CookiesBox: React.FC = () => {
  const { values } = useSelector(cookieSelector);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid justifyContent="center" container columns={{ xs: 9, sm: 11, md: 11 }}>
        {values.map((number, index) => (
          <Grid paddingTop={20} item xs={2} sm={3} md={3} key={index}>
            <Cookie value={number} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CookiesBox;
