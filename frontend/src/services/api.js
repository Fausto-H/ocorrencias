import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
    timeout: 10000,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const hasResponse = Boolean(error?.response);
        const status = hasResponse ? error.response.status : null;
        const data = hasResponse ? error.response.data : null;

        let type = "unknown";
        let message = "Erro inesperado ao processar a requisicao.";

        if (error?.code === "ECONNABORTED") {
            type = "timeout";
            message = "Tempo de resposta excedido. Tente novamente.";
        } else if (!hasResponse) {
            type = "network";
            message = "Falha de conexao com o servidor.";
        } else if (status === 422) {
            type = "validation";
            message = data?.message || "Dados invalidos.";
        } else if (status >= 500) {
            type = "server";
            message = data?.message || "Erro interno do servidor.";
        } else if (status >= 400) {
            type = "http";
            message = data?.message || "Erro na requisicao.";
        }

        const normalizedError = {
            type,
            status,
            message,
            errors: data?.errors || null,
            requestId: data?.request_id || null,
            response: error?.response,
            originalError: error,
        };

        return Promise.reject(normalizedError);
    }
);

export default api;