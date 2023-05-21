import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import { useState, useEffect } from "react";

  
export default function App(){
  const [progress, loadProgress] = useState(0);

  const setProgress = (newProgress) => {
    loadProgress(newProgress);
  };
    return (
      <BrowserRouter>
        <Navbar />
        <LoadingBar color="#f11946" progress={progress} height={3} />
        <Routes>
          <Route
            path="/"
            element={
              <News apiId={process.env.REACT_APP_NEWS_API}
                setProgress={setProgress}
                key={"general"}
                pageSize={5}
                category="general"
              />
            }
          ></Route>
          <Route
            path="/business"
            element={
              <News apiId={process.env.REACT_APP_NEWS_API}
                setProgress={setProgress}
                key={"business"}
                pageSize={5}
                category="business"
              />
            }
          ></Route>
          <Route
            path="/entertainment"
            element={
              <News apiId={process.env.REACT_APP_NEWS_API}
                key={"entertainment"}
                pageSize={5}
                category="entertainment"
                setProgress={setProgress}

              />
            }
          ></Route>
          <Route
            path="/health"
            element={
              <News apiId={process.env.REACT_APP_NEWS_API}
                setProgress={setProgress}
                key={"health"}
                pageSize={5}
                category="health"
              />
            }
          ></Route>
          <Route
            path="/science"
            element={
              <News apiId={process.env.REACT_APP_NEWS_API}
                setProgress={setProgress}
                key={"science"}
                pageSize={5}
                category="science"
              />
            }
          ></Route>
          <Route
            path="/sports"
            element={
              <News apiId={process.env.REACT_APP_NEWS_API}
                setProgress={setProgress}
                key={"sports"}
                pageSize={5}
                category="sports"
              />
            }
          ></Route>
          <Route
            path="/technology"
            element={
              <News apiId={process.env.REACT_APP_NEWS_API}
                setProgress={setProgress}
                key={"technology"}
                pageSize={5}
                category="technology"
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    );
}
