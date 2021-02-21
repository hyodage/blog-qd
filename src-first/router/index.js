import React, { lazy, Suspense } from "react";
import Loading from "../component/loading";
const ListPage = lazy(()=>import("../view/list"));
const ArticPage = lazy(()=>import("../view/artic"));
const UndefinedPage = lazy(() => import("../view/view404"));

const routes = [ {
  path: "/",
  exact: true,
  render(props) {
    return <Suspense fallback={<Loading />}>
      <ListPage {...props} />
    </Suspense>
  }
}, {
  path: "/artic/:id/:name",
  exact: true,
  render(props) {
    return <Suspense fallback={<Loading />}>
      <ArticPage {...props} />
    </Suspense>
  }
}, {
  path: "",
  exact: false,
  render(props) {
    return <Suspense fallback={<Loading />}>
      <UndefinedPage {...props} />
    </Suspense>
  }
}];
export { routes };