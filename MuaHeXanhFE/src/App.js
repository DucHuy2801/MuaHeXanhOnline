import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "../src/routes/index";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}
