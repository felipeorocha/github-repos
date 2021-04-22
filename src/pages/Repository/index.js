import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../service/api";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

import { FaArrowLeft } from "react-icons/fa";

import Container from "../../components/Container";
import { RepoOwner, IssueList } from "./styles";

const override = css`
  display: block;
  margin: 0 auto;
  color: #fff;
  position: absolute;
  left: calc(50% - 30px);
  top: 50%;
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
    const {
      loading,
      repository,
      issues
    } = this.state;

    if (loading) {
      return <ClipLoader css={override} size={80} color={"#fff"} loading={loading} speedMultiplier={1.5} />;
    }

    return(
      <Container>
        <RepoOwner>
          <Link to="/">
            <FaArrowLeft />
            Back to repos
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </RepoOwner>

        <IssueList>
          {
            issues.map(issue => (<li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (<span key={String(label.id)}>{label.name}</span>))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>))
          }
        </IssueList>
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
