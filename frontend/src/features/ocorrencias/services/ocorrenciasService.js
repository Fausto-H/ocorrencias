import api from "../../../services/api";

export async function createOcorrencia(payload) {
    const response = await api.post("/ocorrencias", payload);
    return response.data;
}

export async function listOcorrencias() {
    const response = await api.get("/ocorrencias");
    return response.data;
}
