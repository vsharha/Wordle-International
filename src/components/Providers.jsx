"use client";

import store from "../slices/store";
import { Provider } from "react-redux";
import { Suspense } from "react";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </Provider>
  );
};

export default Providers;
