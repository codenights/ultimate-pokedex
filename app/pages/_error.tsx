import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";

function getPageInfo(statusCode: number | undefined) {
  switch (statusCode) {
    case 400:
      return { title: "400", description: "Bad Request" };
    case 405:
      return { title: "405", description: "Method Not Allowed" };
    case 500:
      return { title: "500", description: "Internal Server Error" };
    default:
      return { title: "404", description: "Page Not Found" };
  }
}

function ErrorContent(props: {
  statusCode: number | undefined;
  route: string;
}) {
  if (props.statusCode === 404 && props.route === "/pokemon/[nationalId]") {
    return (
      <>
        <Head>
          <title>Pokémon Not Found | Ultimate Pokedex</title>
        </Head>

        <Title>Pokémon Not Found</Title>
        <Content>
          <p>This Pokémon doesn‘t exist in the Pokédex.</p>
          <p>
            <a
              href="https://github.com/codenights/ultimate-pokedex/issues/new"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              Open an issue
            </a>{" "}
            if you think this is a mistake.
          </p>
        </Content>
      </>
    );
  }

  const { title, description } = getPageInfo(props.statusCode);

  return (
    <>
      <Head>
        <title>{title} | Ultimate Pokedex</title>
      </Head>

      <Title>{title}</Title>
      <Content>
        <p>{description}</p>
      </Content>
    </>
  );
}

interface ErrorPageProps {
  statusCode: number;
}

function ErrorPage({ statusCode }: ErrorPageProps) {
  const router = useRouter();

  return (
    <Container>
      <ErrorContent statusCode={statusCode} route={router.route} />

      <Link href="/">
        <a className="mt-4">Search Pokédex</a>
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

const Content = styled.div.attrs({
  className: "font-body text-gray-600 py-2",
})`
  font-size: 1.2rem;

  a {
    color: #fafafa;
    border-bottom: 1px solid #fafafa;
  }
`;

export default ErrorPage;
