import React, { Component } from "react";

import { FaGithubAlt, FaPlus } from "react-icons/fa";

import { Container, Form, SubmitButton } from "./styles";

import api from "../../service/api";

class Main extends Component {
  state = {
    repos: [],
    repoName: ''
  };

  handleChange = e => {
    this.setState({ repoName: e.target.value });
  }

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const getRepo = await api.get(`repos/${this.state.repoName}`);
      const { full_name, description, owner: { avatar_url } } = getRepo.data;
      const repo = {
        full_name,
        description,
        avatar_url
      };

      this.setState({ repos: [...this.state.repos, repo] });
    } catch(e) {
      console.log(`Error fetching from repo ${this.state.repoName}: ${e}`);
    }

    this.setState({ repoName: '' });
  }

  render() {
    return(
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Repo name..." onChange={this.handleChange} value={this.state.repoName} />
          <SubmitButton>
            <FaPlus color="#FFF" size={14} />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

export default Main;
