import PageWrapper from "../src/components/PageWrapper";

import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import CookiesBox from "../src/components/CookiesBox";
import PaletteBox from "../src/components/PaletteBox";
import Arrow from "../src/components/Arrow";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <PageWrapper />
        <CookiesBox />
        <Arrow />
        <PaletteBox />
      </Provider>
    </DndProvider>
  );
}
