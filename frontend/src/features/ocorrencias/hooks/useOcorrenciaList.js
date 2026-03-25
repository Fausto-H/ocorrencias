import { useEffect, useState } from "react";
import { listOcorrencias } from "../services/ocorrenciasService";

function getListErrorMessage(error) {
    if (error?.type === "timeout") {
        return "Servidor demorou para responder. Tente novamente.";
    }

    if (error?.type === "network") {
        return "Sem conexao com o servidor no momento.";
    }

    if (error?.type === "server") {
        return "Erro interno ao buscar ocorrencias.";
    }

    return "Erro ao buscar ocorrencias.";
}

export default function useOcorrenciaList(refreshSignal = 0) {
    const [ocorrencias, setOcorrencias] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const loadData = async () => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const data = await listOcorrencias();
            const ordered = [...data].sort((a, b) => b.id - a.id);
            setOcorrencias(ordered);
        } catch (error) {
            setErrorMessage(getListErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            loadData();
        }
    }, [open, refreshSignal]);

    const toggleOpen = () => setOpen((previous) => !previous);

    return {
        ocorrencias,
        open,
        isLoading,
        errorMessage,
        toggleOpen
    };
}
