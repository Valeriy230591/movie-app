import React, { useEffect, useState } from "react";
import style from "./App.module.css";
import TabsList from "../Tabs/TabsList";
import { DataProvider } from "../DataContext/DataContext";
import { createGuestSession } from "../API/Api";

const clearLocalStorageOnUnload = () => {
  window.addEventListener("beforeunload", () => {
    localStorage.clear();
  });
};

function App() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkNetworkStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", checkNetworkStatus);
    window.addEventListener("offline", checkNetworkStatus);

    return () => {
      window.removeEventListener("online", checkNetworkStatus);
      window.removeEventListener("offline", checkNetworkStatus);
    };
  }, []);

  useEffect(() => {
    clearLocalStorageOnUnload();
    if (isOnline) {
      createGuestSession()
        .then((guestSessionId) => {
          localStorage.setItem("guestSessionId", guestSessionId);
        })
        .catch((error) => {
          console.error("Failed to create guest session:", error);
        });
    } else {
      return <p>Отсутствует подключение к сети!</p>;
    }
  }, [isOnline]);

  return (
    <DataProvider>
      <div className={style.wrapper}>
        <TabsList />
      </div>
    </DataProvider>
  );
}

export default App;
