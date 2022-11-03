import { useEffect } from "react";
import { useDispatch } from "react-redux";
import victoryImg from "../../assets/images/victory.svg";
import sound from "../../assets/sounds/victory.mp3";

import Image from "next/image";
import Link from "next/link";
import { revertAll } from "../../redux/cookies/slice";
import styled from "@emotion/styled";

const Victory: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const audio = new Audio(sound);
    audio.play();
    dispatch(revertAll());
  }, []);

  const Button = styled.button`
    width: 260px;
    height: 60px;
    color: white;
    background: #2bd600;
    font-size: 32px;
    border-radius: 20px;
    border-color: #2bd600;
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-45%, -50%);
  `;

  return (
    <div>
      <Image
        alt="Win game"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        src={victoryImg}
      />
      <Link href="/">
        <Button>Заново</Button>
      </Link>
    </div>
  );
};

export default Victory;
