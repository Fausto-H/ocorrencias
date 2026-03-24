import { useEffect, useState } from "react";
import api from "../services/api";

export default function OcorrenciaList() {
    const [ocorrencias, setOcorrencias] = useState([]);
    const [open, setOpen] = useState(false);

    const loadData = async () => {
        try {
            const response = await api.get("/ocorrencias");

            // ordenando do mais recente para o mais antigo
            const ordenado = response.data.sort((a, b) => b.id - a.id);

            setOcorrencias(ordenado);
        } catch (error) {
            console.error("Erro ao buscar ocorrências", error);
        }
    };

    useEffect(() => {
        if (open) {
            loadData();
        }
    }, [open]);

    return (
        <div style={{ marginTop: "20px" }}>
            <button onClick={() => setOpen(!open)}>
                {open ? "Ocultar ocorrências" : "Ver ocorrências"}
            </button>

            {open && (
                <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
                    <thead>
                        <tr>
                            <th>Protocolo</th>
                            <th>Paciente</th>
                            <th>Telefone</th>
                            <th>Endereço da Ocorrência</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ocorrencias.map((o) => (
                            <tr key={o.id}>
                                <td>{o.protocolo}</td>
                                <td>{o.nome_paciente}</td>
                                <td>{o.telefone}</td>
                                <td>{o.endereco}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}