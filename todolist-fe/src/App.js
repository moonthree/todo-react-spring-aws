import { Outlet } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import tw from "twin.macro";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
}

export default App;

const Container = styled.div`
  ${tw`bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg`}
`;
