import styled from "styled-components";

export const RepoOwner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  a {
      display: flex;
      align-items: center;
      text-decoration: none;
      font-size: 16px;

      svg {
        margin-right: 5px;
      }
    }
`;
