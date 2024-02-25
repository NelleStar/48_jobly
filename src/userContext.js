//create a context object to share/consume values within parts of component tree
// wrap the routes in app.js to allow access to the user state -This context object allows you to share data (in this case, the user state) across multiple components in a React application without explicitly passing props through every level of the component tree.
import React from "react";

const userContext = React.createContext();

export default userContext;