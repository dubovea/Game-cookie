import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Image from "next/image";
import styles from "./styles.module.scss";
import layout1 from "../../assets/layouts/layout1.svg";
import layout2 from "../../assets/layouts/layout2.svg";
import layout3 from "../../assets/layouts/layout3.svg";
import { layoutSelector } from "../../redux/layout/selectors";
import { setBackgroundImg } from "../../redux/layout/slice";

const images = [layout1, layout2, layout3];
const PageWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const { backgroundImg } = useSelector(layoutSelector);

  useEffect(() => {
    if (backgroundImg) {
      return;
    }
    const randomImg = images[Math.floor(Math.random() * images.length)];
    dispatch(setBackgroundImg(randomImg));
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
