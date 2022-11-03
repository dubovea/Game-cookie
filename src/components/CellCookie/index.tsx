import React, { useMemo } from "react";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import styles from "./styles.module.scss";
import Image from "next/image";
import cellImg from "../../assets/images/cell.svg";

import { Game } from "../../utils/Game.ts";

import { cookieSelector } from "../../redux/cookies/selectors";
import { wrapperSelector } from "../../redux/wrapper/selectors";

import { setDroppedCookies } from "../../redux/cookies/slice";

import sound from "../../assets/sounds/click.mp3";

type MonitorType = {
  value: string;
  isOver: () => boolean;
  canDrop: () => boolean;
};

const CellCookie: React.FC<{ position: number }> = ({ position }) => {
  const game = useMemo(() => new Game(), []);
  const dispatch = useDispatch();
  const { sortedMode, dropped, currentMode, values } =
      useSelector(cookieSelector),
    { themePath } = useSelector(wrapperSelector),
    oDropped = dropped.find((cookie) => cookie.position === position);
  if (dropped.length === values.length) {
    const { pathname } = Router;
    if (pathname == "/game") {
      Router.push("/end");
    }
  }

  const [{ isOver }, drop] = useDrop(
    () =>
      ({
        accept: "cookie",
        drop: (monitor: MonitorType) => {
          const audio = new Audio(sound);
          audio.play();
          dispatch(
            setDroppedCookies({
              position: position,
              value: monitor.value,
            })
          );
        },
        canDrop: (monitor: MonitorType) => {
          if (!dropped.length) {
            return true;
          }
          const params = {
            dropped: dropped,
            position: position,
            value: monitor.value,
            mode: sortedMode,
          };
          //Кириллица
          if (currentMode.min === 0) {
            return game.canDropSymbol(params);
          }
          return game.canDropNumeric(params);
        },
        collect: (monitor: MonitorType) => ({
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
          src={cellImg}
        />
      ) : (
        <div className={styles.container}>
          <Image
            alt="travel1"
            src={require(`../../assets/images/themes/${themePath}/cookies/drop/cookie.svg`)}
          />
          <div className={styles.centered}>{oDropped.value}</div>
        </div>
      )}
    </div>
  );
};

export default CellCookie;
