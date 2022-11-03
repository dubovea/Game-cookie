import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import { useSelector } from "react-redux";

import Image from "next/image";
import styles from "./styles.module.scss";
import cookie1 from "../../assets/cookies/cookie1.svg";
import smallcookie from "../../assets/cookies/smallcookie.svg";
import { cookieSelector } from "../../redux/cookies/selectors";

const Cookie: React.FC<any> = ({ value }) => {
  const { dropped } = useSelector(cookieSelector),
    isDropped = dropped.find((cookie) => cookie.value === value);
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: { type: "cookie", value: value },
    type: "cookie",
    collect: (monitor) => ({
      item: monitor.getItem(),
      isDragging: !!monitor.isDragging(),
    }),
  })) as any;
  return (
    !isDragging &&
    !isDropped && (
      <>
        <DragPreviewImage connect={preview} src={smallcookie} />
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
            <Image alt="travel" src={cookie1} />
          </div>
          <div className={styles.centered}>{value}</div>
        </div>
      </>
    )
  );
};

export default Cookie;
