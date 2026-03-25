import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import OcorrenciaForm from '../components/OcorrenciaForm';

describe('OcorrenciaForm Component', () => {
  it('deve renderizar título "Nova Ocorrência"', () => {
    const mockOnCreated = vi.fn();
    render(<OcorrenciaForm onCreated={mockOnCreated} />);
    expect(screen.getByText('Nova Ocorrência')).toBeInTheDocument();
  });

  it('deve renderizar campos de entrada', () => {
    const mockOnCreated = vi.fn();
    render(<OcorrenciaForm onCreated={mockOnCreated} />);
    
    expect(screen.getByPlaceholderText('Nome do paciente')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Telefone / WhatsApp')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Endereço')).toBeInTheDocument();
  });

  it('deve renderizar botão de registrar', () => {
    const mockOnCreated = vi.fn();
    render(<OcorrenciaForm onCreated={mockOnCreated} />);
    expect(screen.getByText('Registrar')).toBeInTheDocument();
  });

  it('deve ter classe oc-form no formulário', () => {
    const mockOnCreated = vi.fn();
    const { container } = render(<OcorrenciaForm onCreated={mockOnCreated} />);
    expect(container.querySelector('.oc-form')).toBeInTheDocument();
  });
});
