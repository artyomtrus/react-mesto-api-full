import React from "react";
import { Route } from "react-router-dom";

function Footer() {
  return (
    <Route exact path="/">
      <footer>
        <p className="footer">© 2020 Mesto Russia</p>
      </footer>
    </Route>
  );
}

export default Footer;
