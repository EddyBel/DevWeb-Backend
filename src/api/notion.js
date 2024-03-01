// Importa el cliente de Notion
const { Client } = require("@notionhq/client");

// Crea una instancia del cliente con tu token de autenticación
const notion = new Client({
  auth: "secret_i6d7miH9igrqUR2Icsf90LPzLIU1hH58z0eN5qoSOA2",
});

// Define una función que recibe el id de una página y retorna su contenido como json
async function getNotionPage(ID) {
  const page = await notion.blocks.children.list({
    block_id: ID,
  });
  return page;
}

/**
 * Funcion que obtiene la información de la base de datos de notion segun la ID
 * @param {string} ID
 * @returns
 */
async function getNotionDatabase(ID) {
  const page = await notion.databases.query({ database_id: ID });
  return page;
}

module.exports = {
  getNotionPage,
  getNotionDatabase,
};
