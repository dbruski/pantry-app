import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Navbar from '../components/organisms/Navbar/Navbar';

const StyledWrapper = styled.div`
  position: relative;
  margin-top: 10vh;
  min-height: 90vh;
  padding: 45px 60px;
  /* overflow: hidden; */
`;

const PageTemplate = ({ children }) => (
  <>
    <Navbar />
    <StyledWrapper>{children}</StyledWrapper>
  </>
);

PageTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTemplate;
