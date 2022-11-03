import PageWrapper from "../src/components/PageWrapper";
import Menu from "../src/components/Menu";


import { Provider } from "react-redux";
import { store } from "../src/redux/store";

export default function Home() {
  return (
    <Provider store={store}>
      <PageWrapper />
      <Menu />
    </Provider>
  );
}
