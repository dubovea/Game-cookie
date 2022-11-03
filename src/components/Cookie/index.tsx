import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";

import Image from "next/image";
import styles from "./styles.module.scss";

import { wrapperSelector } from "../../redux/wrapper/selectors";
import { cookieSelector } from "../../redux/cookies/selectors";

import sound from "../../assets/sounds/click.mp3";

const Cookie: React.FC<any> = ({ value }) => {
  const { dropped } = useSelector(cookieSelector),
    { themePath } = useSelector(wrapperSelector),
    isDropped = dropped.find((cookie) => cookie.value === value),
    [randomCookie] = useState(Math.floor(Math.random() * 3) + 1);

  const [{ isDragging }, drag] = useDrag(() => ({
    item: { type: "cookie", value: value },
    type: "cookie",
    collect: (monitor) => ({
      item: monitor.getItem(),
      isDragging: !!monitor.isDragging(),
    }),
  })) as any;

  if (isDragging) {
    const audio = new Audio(sound);
    audio.play();
  }
  return (
    !isDragging &&
    !isDropped && (
      <>
        <div
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            fontWeight: "bold",
            cursor: "move",
          }}
          className={styles.container}
        >
          <div>
            <Image
              alt="travel"
              src={require(`../../assets/images/themes/${themePath}/cookies/drag/cookie${randomCookie}.svg`)}
            />
            <div className={styles.centered}>{value}</div>
          </div>
        </div>
      </>
    )
  );
};

export default Cookie;
