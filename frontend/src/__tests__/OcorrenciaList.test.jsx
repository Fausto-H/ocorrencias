import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OcorrenciaList from '../components/OcorrenciaList';

describe('OcorrenciaList Component', () => {
  it('deve renderizar botão "Ver ocorrências"', () => {
    render(<OcorrenciaList />);
    expect(screen.getByText('Ver ocorrências')).toBeInTheDocument();
  });

  it('deve ter classe oc-button no botão', () => {
    const { container } = render(<OcorrenciaList />);
    expect(container.querySelector('.oc-button')).toBeInTheDocument();
  });

  it('deve ter classe oc-button-secondary no botão', () => {
    const { container } = render(<OcorrenciaList />);
    expect(container.querySelector('.oc-button-secondary')).toBeInTheDocument();
  });

  it('deve ter seção com classe oc-list-section', () => {
    const { container } = render(<OcorrenciaList />);
    expect(container.querySelector('.oc-list-section')).toBeInTheDocument();
  });
});
