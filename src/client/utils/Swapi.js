const parametros = {}
parametros.url = ''
parametros.format = ''
parametros.resource = ''
parametros.id = ''
let url = ''

/**
 * Verifica os parâmetros e monta a URI de acordo com estes
 */
const preparaURL = () => {
  // eslint-disable-next-line prefer-destructuring
  url = parametros.url
  if (parametros.resource !== '') url += parametros.resource
  if (parametros.id !== '') url += `${parametros.id}/`
  if (parametros.format !== '') url += `${parametros.format}`
}
/**
 * Obtem os dados da SWAPI
 */
const obtemDados = async () => {
  parametros.url = 'https://swapi.dev/api/'
  parametros.format = '?format=json'
  preparaURL()
  const dados = await fetch(url).then((resposta) => resposta.json())
  return dados
}
/**
 * Limpa todos os parametros de Consulta da API
 */
const limpaParametros = () => {
  parametros.url = ''
  parametros.format = ''
  parametros.resource = ''
  parametros.id = ''
}
/**
 * Prepara a consulta por Planeta específico ou por todos os Planetas
 * @param {string} id Identificador do Planeta
 */
const obtemPlanetas = (id) => {
  parametros.resource = 'planets/'
  if (id) parametros.id = id
}

export { obtemDados, limpaParametros, obtemPlanetas }
