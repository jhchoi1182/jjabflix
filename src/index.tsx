import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import { theme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import router from "./Router";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
