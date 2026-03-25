import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

describe('Home Component', () => {
  it('deve renderizar título "Sistema de Ocorrências"', () => {
    render(<Home />);
    expect(screen.getByText('Sistema de Ocorrências')).toBeInTheDocument();
  });

  it('deve renderizar formulário de nova ocorrência', () => {
    render(<Home />);
    expect(screen.getByText('Nova Ocorrência')).toBeInTheDocument();
  });

  it('deve renderizar botão para ver ocorrências', () => {
    render(<Home />);
    expect(screen.getByText('Ver ocorrências')).toBeInTheDocument();
  });

  it('deve renderizar main com classe home-page', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('.home-page')).toBeInTheDocument();
  });
});
