/**
 * Esta función toma un numero de variables y valida que tengan algun valor
 * @param  {...any} values Variables a validar.
 * @returns {boolean} Resultado de la validación.
 */
function validateValues(...values) {
  // Recorre todos los valores y verifica que no esten vacios o indefinidos
  for (let value of values)
    if (value === null || value === undefined) return false;
  // Si llegas hasta aqui los valores contienen valores
  return true;
}

/**
 * Esta función toma un numero de variables y valida que no sean objetos vacios.
 * @param  {...any} objetos Objetos a validar
 * @returns {boolean} Resultado de la validación
 */
function validateObjectsNotNull(...objects) {
  // Recorremos todos los argumentos con un bucle for...of
  for (let valor of objects) {
    // Si el tipo de dato no es "object", devolvemos false
    if (typeof valor !== "object") return false;
    // Si el valor es null, devolvemos false
    if (!valor) return false;
    // Si el valor es un array, devolvemos false
    if (Array.isArray(valor)) return false;
    // Si el valor es un objeto vacío, devolvemos false
    if (Object.keys(valor).length === 0) return false;
  }
  // Si llegamos hasta aquí, significa que todos los argumentos son objetos no vacíos, así que devolvemos true
  return true;
}

/**
 * Esta función toma un numero indefnido de arrays y valida que sean array y no esten vacios
 * @param  {...any} arrays Arrays a validar
 * @returns {boolean} Resultado de la validación
 */
function validateArrays(...arrays) {
  // Recorremos todos los argumentos con un bucle for...of
  // Validamos si el argumento es array y su tamaño es mas grande que 0
  // En caso de que no retorna un false
  for (let array of arrays)
    if (!Array.isArray(array) || array?.length === 0) return false;
  // Si llegamos hasta aquí, significa que todos los argumentos son arrays no vacíos, así que devolvemos true
  return true;
}

module.exports = {
  validateArrays,
  validateObjectsNotNull,
  validateValues,
};
