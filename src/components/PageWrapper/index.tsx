import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Image from "next/image";
import styles from "./styles.module.scss";
import { wrapperSelector } from "../../redux/wrapper/selectors";
import {
  setCurrentThemePath,
  setBackgroundImg,
} from "../../redux/wrapper/slice";

const PageWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const { backgroundImg, themes } = useSelector(wrapperSelector);

  useEffect(() => {
    if (backgroundImg) {
      return;
    }
    const random = Math.floor(Math.random() * themes) + 1,
      path = `theme${random}`;
    const theme = require(`../../assets/images/themes/${path}/wrapper.svg`);
    dispatch(setBackgroundImg(theme));
    dispatch(setCurrentThemePath(path));
  }, []);

  if (!backgroundImg) {
    return;
  }
  return (
    <div className={styles.root}>
      <Image alt="travel" fill quality={100} src={backgroundImg} />
    </div>
  );
};

export default PageWrapper;
