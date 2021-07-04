import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }: RouteProps) {
 
  return (
    <Route
      {...rest}
      render={({ location }) =>
        children
      }
    />
  );
}
