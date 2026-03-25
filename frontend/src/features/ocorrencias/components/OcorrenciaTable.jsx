import React from "react";

export default function OcorrenciaTable({ ocorrencias, isLoading, errorMessage }) {
    if (isLoading) {
        return <p className="oc-list-status">Carregando ocorrencias...</p>;
    }

    if (errorMessage) {
        return <p className="oc-list-status oc-list-status-error">{errorMessage}</p>;
    }

    if (!ocorrencias.length) {
        return <p className="oc-list-status">Nenhuma ocorrencia registrada.</p>;
    }

    return (
        <div className="oc-table-wrapper">
            <table className="oc-table">
                <thead>
                    <tr>
                        <th>Protocolo</th>
                        <th>Paciente</th>
                        <th>Telefone</th>
                        <th>Endereco da Ocorrencia</th>
                    </tr>
                </thead>

                <tbody>
                    {ocorrencias.map((ocorrencia) => (
                        <tr key={ocorrencia.id}>
                            <td>{ocorrencia.protocolo}</td>
                            <td>{ocorrencia.nome_paciente}</td>
                            <td>{ocorrencia.telefone}</td>
                            <td>{ocorrencia.endereco}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
