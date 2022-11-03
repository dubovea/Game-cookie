import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import styles from "./styles.module.scss";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import {
  setCountItems,
  setRandomValues,
  setOrder,
} from "../../redux/cookies/slice";
import { cookieSelector } from "../../redux/cookies/selectors";
import { wrapperSelector } from "../../redux/wrapper/selectors";

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const { sortedMode, defaultCountItems } = useSelector(cookieSelector);
  const { sound } = useSelector(wrapperSelector);

  const handleChangeCountItems = (target: any) => {
    dispatch(setCountItems(target.value));
  };

  const handleChangeValues = (target: any) => {
    dispatch(setRandomValues(target.value));
  };

  const handleOrder = (type: string) => {
    dispatch(setOrder(type));
  };

  const fireSound = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  const Label1 = styled.b`
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 44px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #423f45;
  `;
  const BtnStart = styled.button`
    width: 260px;
    height: 60px;
    color: white;
    font-style: normal;
    font-weight: 700;
    background: #38df7a;
    font-size: 32px;
    border-radius: 20px;
    border-color: #38df7a;
  `;
  const BtnAscDesc = styled.button`
    width: 280px;
    height: 60px;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    border-radius: 20px;
    border-color: #ffd748;
    color: black;
    background: #ffd748;
  `;

  const marksValues = [
    {
      value: 0,
      label: "A",
    },
    {
      value: 1,
      label: 9,
    },
    {
      value: 2,
      label: 19,
    },
    {
      value: 3,
      label: 50,
    },
    {
      value: 4,
      label: 99,
    },
    {
      value: 5,
      label: 999,
    },
  ];
  const marksCounts = [
    {
      value: 2,
      label: 2,
    },
    {
      value: 3,
      label: 3,
    },
    {
      value: 4,
      label: 4,
    },
    {
      value: 5,
      label: 5,
    },
  ];

  return (
    <div className={styles.menu}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 6,
        }}
      >
        <Label1>Кол-во предметов</Label1>
        <Slider
          sx={{
            color: "#FFD748",
            width: 350,
            height: "15px",
          }}
          onChange={(e) => handleChangeCountItems(e.target)}
          aria-label="Always visible"
          defaultValue={defaultCountItems}
          min={2}
          max={5}
          step={1}
          marks={marksCounts}
        />
        <Label1>Значения</Label1>
        <Slider
          sx={{
            color: "#FFD748",
            height: "15px",
          }}
          onChange={(e) => handleChangeValues(e.target)}
          color="secondary"
          aria-label="Always visible"
          defaultValue={0}
          min={1}
          max={5}
          step={1}
          marks={marksValues}
        />
        <div style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: "40px",
              width: "600px",
              height: "120px",
            }}
          >
            <BtnAscDesc
              style={{ opacity: sortedMode === "desc" ? 1 : 0.5 }}
              onClick={() => handleOrder("desc")}
            >
              По убыванию
            </BtnAscDesc>
            <BtnAscDesc
              style={{ opacity: sortedMode === "asc" ? 1 : 0.5 }}
              onClick={() => handleOrder("asc")}
            >
              По возрастанию
            </BtnAscDesc>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="/game">
              <BtnStart onClick={() => fireSound()}> Играть</BtnStart>
            </Link>
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Menu;
