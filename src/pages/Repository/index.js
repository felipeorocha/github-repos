import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../service/api";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

import { FaArrowLeft } from "react-icons/fa";

import Container from "../../components/Container";
import { RepoOwner } from "./styles";

const override = css`
  display: block;
  margin: 0 auto;
  color: #fff;
  padding: 10px;
`;

class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5
        }
      })
    ]);

    this.setState({ repository: repository.data, issues: issues.data, loading: false });
  }

  render() {

    if (this.state.loading) {
      return <ClipLoader css={override} size={20} color={"#fff"} loading={this.state.loading} speedMultiplier={1.5} />;
    }

    return(
      <Container>
        <RepoOwner>
          <Link to="/">
            <FaArrowLeft />
            Back to repos
          </Link>
          <img src={this.state.repository.owner.avatar_url} alt={this.state.repository.owner.login} />
          <h1>{this.state.repository.name}</h1>
          <p>{this.state.repository.description}</p>
        </RepoOwner>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string
    })
  }).isRequired
}

export default Repository;
