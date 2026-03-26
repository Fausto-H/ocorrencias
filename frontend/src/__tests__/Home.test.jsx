import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

describe('Home Component', () => {
  it('deve renderizar título "Sistema de Ocorrências"', () => {
    render(<Home />);
    expect(screen.getByText(/sistema de ocorrências/i)).toBeInTheDocument();
  });

  it('deve renderizar formulário de nova ocorrência', () => {
    render(<Home />);
    expect(screen.getByText(/registrar nova ocorrência/i)).toBeInTheDocument();
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
