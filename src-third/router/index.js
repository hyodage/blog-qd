import React from "react";
import UndefinedPage from "../view/view404";
import ArticPage from "../view/artic";
import ListPage from "../view/list";
const routes = [{
  path: "/",
  exact: true,
  render(props) {
    return <ListPage {...props} />
  }
}, {
  path: "/artic/:id/:name",
  exact: true,
  render(props) {
    return <ArticPage {...props} />
  }
}, {
  path: "",
  exact: false,
  render(props) {
    return <UndefinedPage {...props} />
  }
}];
export { routes };