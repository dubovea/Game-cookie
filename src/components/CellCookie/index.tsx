import React, { useMemo } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import styles from "./styles.module.scss";
import Image from "next/image";
import cell from "../../assets/palletes/cell.svg";
import smallcookie from "../../assets/cookies/smallcookie.svg";

import { Game } from "../../utils/Game.ts";

import { cookieSelector } from "../../redux/cookies/selectors";

import { setDroppedCookies } from "../../redux/cookies/slice";

const CellCookie: React.FC<any> = ({ position }) => {
  const game = useMemo(() => new Game(), []);
  const dispatch = useDispatch();
  const { dropped, currentMode, values } = useSelector(cookieSelector),
    oDropped = dropped.find((cookie) => cookie.position === position);
  debugger;
  if (dropped.length === values.length) {
    const { pathname } = Router;
    if (pathname == "/game") {
      Router.push("/end");
    }
  }
  const [{ isOver, canDrop }, drop] = useDrop(
    () =>
      ({
        accept: "cookie",
        drop: (monitor) => {
          dispatch(
            setDroppedCookies({
              position: position,
              value: monitor.value,
            })
          );
        },
        canDrop: (monitor) => {
          if (!dropped.length) {
            return true;
          }
          const params = {
            dropped: dropped,
            position: position,
            value: monitor.value,
          };
          //Кириллица
          if (currentMode.min === 0) {
            return game.canDropSymbol(params);
          }
          return game.canDropNumeric(params);
        },
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
          canDrop: !!monitor.canDrop(),
        }),
      } as any),
    [dropped, currentMode]
  );

  return (
    <div ref={drop}>
      {!oDropped ? (
        <Image
          style={{
            borderColor: isOver ? "green" : "unset",
            borderWidth: "5px",
            borderStyle: "solid",
            borderRadius: "70px",
          }}
          alt="travel"
          src={cell}
        />
      ) : (
        <div className={styles.container}>
          <Image alt="travel1" src={smallcookie} />
          <div className={styles.centered}>{oDropped.value}</div>
        </div>
      )}
    </div>
  );
};

export default CellCookie;
