export function acessDeniedError() {
    return {
        type: "accessDeniedError",
        message: "Operação não permitida."
    };
}