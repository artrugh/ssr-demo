import React from "react";
import { Router } from "./Router";
import { Route } from "./Route";
import Breed from "./pages/breed";
import Breeds from "./pages/breeds";

function App({ initialPath }: { initialPath: string }) {
  return (
    <Router initialPath={initialPath}>
      <Route path="/breeds">
        <Breeds></Breeds>
      </Route>
      <Route path="/breed">
        <Breed></Breed>
      </Route>
    </Router>
  );
}

export default App;
