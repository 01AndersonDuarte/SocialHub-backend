export function userNotFoundError() {
  return {
    type: 'userNotFoundError',
    message: 'Usuário não encontrado.',
  };
}
