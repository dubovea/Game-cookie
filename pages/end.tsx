import React from "react";

import PageWrapper from "../src/components/PageWrapper";
import Victory from "../src/components/Victory";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
export default function Home() {
  return (
    <div>
      <Provider store={store}>
        <PageWrapper />
        <Victory />
      </Provider>
    </div>
  );
}
