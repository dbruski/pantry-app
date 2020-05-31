import React from 'react';
import PageTemplate from '../templates/PageTemplate';
import Input from '../components/atoms/Input/Input';
import Button from '../components/atoms/Button/Button';

const TestingComponents = () => (
  <PageTemplate>
    <Input placeholder={'hii'} />
    <Input placeholder={'search'} search />
    <Button>nikuśś</Button>
  </PageTemplate>
);

export default TestingComponents;
