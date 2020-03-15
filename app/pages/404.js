import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

function getPageTitle(path) {
  switch (path) {
    case "/pokemon":
      return {
        title: "Pokémon not found",
        description: "This Pokémon doesn‘t exist yet in the Pokédex.",
      };
    default:
      return {
        title: "Page not found",
        description: "There‘s nothing here.",
      };
  }
}

function NotFoundPage() {
  const router = useRouter();
  const { title, description } = getPageTitle(router.asPath);

  return (
    <Container>
      <Head>
        <title>{title} | Ultimate Pokedex</title>
      </Head>

      <Title>{title}</Title>
      <Description>{description}</Description>

      <Link href="/">
        <a className="mt-1">Search Pokédex</a>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  color: #fff;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: Futura-Medium;
  font-size: 2rem;
`;

const Description = styled.p.attrs({
  className: "font-body text-gray-600",
})`
  font-size: 1.2rem;
`;

export default NotFoundPage;
