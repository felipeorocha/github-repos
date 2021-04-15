import React, { Component } from "react";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { FaGithubAlt, FaPlus } from "react-icons/fa";

import { Container, Form, SubmitButton, List } from "./styles";

import api from "../../service/api";

const override = css`
  display: block;
  margin: 0 auto;
  color: #fff;
  padding: 10px;
`;
class Main extends Component {
  state = {
    repos: [],
    repoName: '',
    loading: false
  };

  componentDidMount() {
    const loadStorageRepos = localStorage.getItem('github_repositories');
    this.setState({ repos: JSON.parse(loadStorageRepos) });
  }

  componentDidUpdate(prevProps) {

  }

  handleChange = e => {
    this.setState({ repoName: e.target.value });
  }

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const getRepo = await api.get(`repos/${this.state.repoName}`);
      const { full_name, description, owner: { avatar_url } } = getRepo.data;
      const repo = {
        full_name,
        description,
        avatar_url
      };

      this.setState({ repos: [...this.state.repos, repo] });
      localStorage.setItem('github_repositories', JSON.stringify(this.state.repos));
    } catch(e) {
      console.log(`Error fetching from repo ${this.state.repoName}: ${e}`);
    }

    this.setState({ repoName: '', loading: false });
  }

  render() {
    return(
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Repo name..."
            onChange={this.handleChange}
            value={this.state.repoName}
          />
          <SubmitButton loading={this.state.loading}>
              { this.state.loading ?
                  <ClipLoader css={override} size={20} color={"#fff"} loading={this.state.loading} speedMultiplier={1.5} /> :
                  <FaPlus color="#FFF" size={14} /> }
          </SubmitButton>
        </Form>

        <List>
          { this.state.repos.map(item => <li key={item.full_name}>{item.full_name}</li>) }
        </List>
      </Container>
    );
  }
}

export default Main;
