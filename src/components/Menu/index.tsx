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
import { layoutSelector } from "../../redux/layout/selectors";

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const { sortedMode, defaultCountItems } = useSelector(cookieSelector);
  const { sound } = useSelector(layoutSelector);

  const handleChangeCountItems = (target) => {
    dispatch(setCountItems(target.value));
  };

  const handleChangeValues = (target) => {
    dispatch(setRandomValues(target.value));
  };

  const handleOrder = (type) => {
    dispatch(setOrder(type));
  };

  const fireSound = () => {
    var audio = new Audio(sound);
    // audio.play();
  };

  const Label1 = styled.b`
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
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
    background: #38df7a;
    font-size: 32px;
    border-radius: 20px;
    border-color: #38df7a;
  `;
  const BtnAscDesc = styled.button`
    width: 260px;
    height: 60px;
    font-family: "Calibri";
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    border-radius: 20px;
    border-color: #ffd748;
    color: black;
    background: #ffd748;
  `;

  const marks = [
    {
      value: 0,
      label: "A",
    },
    {
      value: 9,
      label: 9,
    },
    {
      value: 19,
      label: 19,
    },
    {
      value: 50,
      label: 50,
    },
    {
      value: 99,
      label: 99,
    },
  ];
  const marks1 = [
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
          p: 2,
          m: 3,
          borderRadius: 1,
        }}
      >
        <Label1>Кол-во предметов</Label1>
        <Slider
          onChange={(e) => handleChangeCountItems(e.target)}
          color="secondary"
          aria-label="Always visible"
          defaultValue={defaultCountItems}
          min={2}
          max={5}
          step={1}
          marks={marks1}
          valueLabelDisplay="on"
        />
        <Label1>Значения</Label1>
        <Slider
          onChange={(e) => handleChangeValues(e.target)}
          color="secondary"
          aria-label="Always visible"
          defaultValue={0}
          step={10}
          marks={marks}
          valueLabelDisplay="on"
        />
        <div style={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              m: 5,
            }}
          >
            <BtnAscDesc
              style={{ opacity: sortedMode === "asc" ? 1 : 0.5 }}
              onClick={() => handleOrder("asc")}
            >
              По убыванию
            </BtnAscDesc>
            <BtnAscDesc
              style={{ opacity: sortedMode === "desc" ? 1 : 0.5 }}
              onClick={() => handleOrder("desc")}
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
              m: 7,
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
