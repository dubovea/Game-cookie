import React from "react";
import { useSelector } from "react-redux";

import Image from "next/image";
import styles from "./styles.module.scss";
import arrowAsc from "../../assets/images/arrows/arrowAsc.svg";
import arrowDesc from "../../assets/images/arrows/arrowDesc.svg";
import { cookieSelector } from "../../redux/cookies/selectors";

const Arrow: React.FC = () => {
  const { sortedMode } = useSelector(cookieSelector);
  return (
    <div
      className={sortedMode === "asc" ? styles.centered_l : styles.centered_r}
    >
      <Image alt="travel" src={sortedMode === "asc" ? arrowAsc : arrowDesc} />
    </div>
  );
};

export default Arrow;
