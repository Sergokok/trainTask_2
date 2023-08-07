// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";

// const rootElement = document.getElementById("root")!;
// const root = ReactDOM.createRoot(rootElement);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import trainReducer from "./store/trainReducer";

const store = createStore(trainReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
