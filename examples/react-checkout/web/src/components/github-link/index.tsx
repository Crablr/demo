"use client";
import { FC } from "react";
import githubMark from "./github-mark.png";
import styled from "@emotion/styled";

const Container = styled.a`
  position: fixed;
  right: 32px;
  top: 32px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 8px;
  box-shadow:
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  img {
    width: 36px;
    height: 36px;
  }
`;

interface IProps {
  repository: string;
}

export const GithubLink: FC<IProps> = ({ repository }) => (
  <Container href={repository} target="_blank">
    <img src={githubMark.src} alt="Github repository" />
  </Container>
);
