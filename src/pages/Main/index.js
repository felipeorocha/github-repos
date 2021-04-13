import React, { Component } from "react";

import { FaGitHubAlt, FaPlus } from "react-icons/fa";

import { Container, Form, SubmitButton } from "./styles";

class Main extends Component {
    render() {
        return(
            <Container>
                <FaGitHubAlt />
                <h1>Repositórios</h1>

                <Form onSubmit={() => this.handleSubmit}>
                    <input type="text" placeholder="Repo name..." onChange={() => this.handleChange} />
                    <SubmitButton>
                        <FaPlus color="#FFF" size={14} />
                    </SubmitButton>
                </Form>
            </Container>
        );
    }
}

export default Main;
