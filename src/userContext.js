//create a context object to share/consume values within parts of component tree
// wrap the routes in app.js to allow access to the user state
import React from "react";

const userContext = React.createContext();

export default userContext;