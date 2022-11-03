import React from "react";

import { useSelector, useDispatch } from "react-redux";

import Image from "next/image";
import Grid from "@mui/material/Grid";

import styles from "./styles.module.scss";
import pallete5 from "../../assets/palletes/pallete5.svg";

import { cookieSelector } from "../../redux/cookies/selectors";
import CellCookie from "../CellCookie";

const PaletteBox: React.FC = () => {
  const { countItems } = useSelector(cookieSelector);

  return (
    <div className={styles.center_bottom}>
      <Grid
        justifyContent="center"
        container
        columns={{ xs: 2 * countItems, sm: 2 * countItems, md: 2 * countItems }}
      >
        {Array.from(Array(countItems)).map((number, index) => (
          <CellCookie key={index} position={index} />
        ))}
      </Grid>
      <Image
        style={{
          zIndex: -1,
        }}
        className={styles.centered}
        alt="travel"
        quality={100}
        src={pallete5}
      />
    </div>
  );
};

export default PaletteBox;
