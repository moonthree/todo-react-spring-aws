import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Header>
        <Logo>
          <Link to="/">Todolist</Link>
        </Logo>
        <Nav>
          <Link to="/login">로그인</Link>
        </Nav>
      </Header>
    </>
  );
}

const Header = styled.header`
  ${tw`w-full flex justify-between h-12`}
`;

const Logo = styled.div`
  ${tw`text-4xl font-bold`}
`;

const Nav = styled.nav`
  ${tw`flex items-center`}
`;
