import React from "react";
import PropTypes from "prop-types";

import { Container } from "./styles";

function Repository({ match }) {
  return(
    <h2>Repository: {decodeURIComponent(match.params.repository)}</h2>
  );
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string
    })
  }).isRequired
}

export default Repository;
