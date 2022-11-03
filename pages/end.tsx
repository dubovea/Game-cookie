import end from "../src/assets/layouts/end.svg";
import PageWrapper from "../src/components/PageWrapper";
import Image from "next/image";
import Link from "next/link";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import styled from "@emotion/styled";
export default function Home() {
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
      <Provider store={store}>
        <PageWrapper />
        <Image
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          src={end}
        />
        <Link href="/">
          <Button>Заново</Button>
        </Link>
      </Provider>
    </div>
  );
}
