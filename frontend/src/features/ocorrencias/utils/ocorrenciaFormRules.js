export function formatTelefone(value) {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function normalizeText(value) {
    return value.replace(/\s+/g, " ").trim();
}

export function validateOcorrenciaForm(currentForm) {
    const nextErrors = {
        nome_paciente: "",
        telefone: "",
        endereco: ""
    };

    const nome = normalizeText(currentForm.nome_paciente);
    const telefoneDigits = currentForm.telefone.replace(/\D/g, "");
    const endereco = normalizeText(currentForm.endereco);

    if (!nome) {
        nextErrors.nome_paciente = "Informe o nome do paciente.";
    } else if (nome.length < 3) {
        nextErrors.nome_paciente = "O nome precisa ter pelo menos 3 caracteres.";
    } else if (nome.length > 120) {
        nextErrors.nome_paciente = "O nome pode ter no maximo 120 caracteres.";
    } else if (!/^[\p{L}\s'\-]+$/u.test(nome)) {
        nextErrors.nome_paciente = "Use apenas letras, espacos, hifen e apostrofo. (Ex: Joao da Silva, Jean-Paul, O'Neill)";
    }

    if (!telefoneDigits) {
        nextErrors.telefone = "Informe o telefone com DDD.";
    } else if (!/^\d{10,11}$/.test(telefoneDigits)) {
        nextErrors.telefone = "O telefone deve ter 10 ou 11 digitos. (Ex: (11) 91234-5678)";
    }

    if (!endereco) {
        nextErrors.endereco = "Informe o endereco.";
    } else if (endereco.length < 8) {
        nextErrors.endereco = "O endereco precisa no minimo 8 caracteres. (Ex: Rua ABC, 123 - Bairro)";
    } else if (endereco.length > 255) {
        nextErrors.endereco = "O endereco pode ter no maximo 255 caracteres.";
    } else if (!/\d/.test(endereco)) {
        nextErrors.endereco = "Inclua o numero no endereco.";
    }

    return nextErrors;
}

export function toOcorrenciaPayload(form) {
    return {
        nome_paciente: normalizeText(form.nome_paciente),
        telefone: form.telefone.replace(/\D/g, ""),
        endereco: normalizeText(form.endereco)
    };
}
