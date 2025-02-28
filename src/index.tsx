import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./Router/AppRouter";
import "./i18n";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {S3Provider} from "./Providers/S3Provider";
import firebase from "firebase/compat/app";
import initializeApp = firebase.initializeApp;
import {firebaseConfig} from "./Config/config";
import {UserProvider} from "./Providers/UserProvider";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient()

initializeApp(firebaseConfig)

root.render(
    <React.StrictMode>
      <UserProvider>
        <S3Provider>
          <QueryClientProvider client={queryClient}>
            <AppRouter />
          </QueryClientProvider>
        </S3Provider>
      </UserProvider>
    </React.StrictMode>
);

