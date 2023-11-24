import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CheckRouteAccess } from "./CommonMethods/Authentication";
import { APIPath } from "./CommonMethods/Fetch";
// eslint-disable-next-line react/prop-types
export default function PrivateRoute({
  component: Component,
  componentWithProps: componentWithProps,
  ...rest
}) {
  // const [access, setAccess] = useState(CheckRouteAccess());
  return (
    <Route
      {...rest}
      render={(props) =>
        CheckRouteAccess(props.location.pathname) ? (
          componentWithProps ? (
            componentWithProps
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to={APIPath() + "login"} />
        )
      }
    />
  );
}
