const { Router } = require("express");
const { getNotionPage, getNotionDatabase } = require("../api/notion");
const articles = Router();

/** Esta ruta se encargfa de obtener las notas de snippets que busca de notion                                  */
articles.get("/snippets", async (req, res) => {
  try {
    const response = await getNotionDatabase(process.env.NOTION_DB_SNIPPETS);
    const properties = response.results.map((item) => {
      const props = item.properties;
      const url = item.url;
      const tags = props.Tags.multi_select.map((tag) => tag.name);
      const lang = props.Lenguaje.multi_select.map((tag) => tag.name);
      const name = props.Nombre.title[0].plain_text;
      const id = url.split("/").pop().split("-").pop();

      return {
        tags,
        lang,
        name,
        id,
      };
    });

    res.json({
      message: "Success: Posts Snippets found",
      data: properties,
    });
  } catch (error) {
    res.json({
      msg: "Error: Posts Snippets not found",
      error: error.message,
      data: null,
    });
  }
});

/**
 * Esta ruta obtiene el contenido de la pagina dado un id
 */
articles.get("/snippets/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await getNotionPage(id);
    const blocks = response.results;
    const content = blocks.map((block) => {
      return {
        content: block[block.type],
        type: block.type,
      };
    });
    res.json({
      message: "Success: Post Snippets found",
      data: content,
    });
  } catch (error) {
    res.json({
      msg: "Error: Post Snippets not found",
      error: error.message,
      data: null,
    });
  }
});

articles.get("/notes", async (req, res) => {
  try {
    const response = await getNotionDatabase(process.env.NOTION_DB_NOTES);
    const properties = response.results.map((item) => {
      const props = item.properties;
      const url = item?.url;
      const matter = props.Matter?.select?.name;
      const name = props.Nombre?.title[0]?.plain_text;
      const description = props.Descripcion?.rich_text[0]?.plain_text;
      const date = props.Fecha?.created_time;
      const id = url.split("/").pop().split("-").pop();

      return {
        matter,
        id,
        name,
        description,
        date,
      };
    });

    res.json({
      msg: "Success: Post Notes found",
      data: properties,
    });
  } catch (error) {
    res.json({
      msg: "Error: Post Notes not found",
      error: error.message,
      data: null,
    });
  }
});

articles.get("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await getNotionPage(id);
    const blocks = response.results;
    const content = blocks.map((block) => {
      return {
        content: block[block.type],
        type: block.type,
      };
    });
    res.json({
      message: "Success: Post Note found",
      data: content,
    });
  } catch (error) {
    res.json({
      msg: "Error: Post Note not found",
      error: error.message,
      data: null,
    });
  }
});

articles.get("/posts", async (req, res) => {
  try {
    const response = await getNotionDatabase(process.env.NOTION_DB_POSTS);
    const properties = response.results.map((item) => {
      const props = item.properties;
      const url = item?.url;
      const matter = props.Matter?.select?.name;
      const name = props.Nombre?.title[0]?.plain_text;
      const description = props.Descripcion?.rich_text[0]?.plain_text;
      const tags = props.Tags?.multi_select?.map((tag) => tag?.name);
      const lang = props.Lenguaje?.multi_select?.map((tag) => tag?.name);
      const date = props.Fecha?.created_time;
      const id = url.split("/").pop().split("-").pop();

      return {
        matter,
        id,
        name,
        description,
        date,
        tags,
        lang,
      };
    });

    res.json({
      msg: "Success: Posts Posts found",
      data: properties,
    });
  } catch (error) {
    res.json({
      msg: "Error: Posts Posts not found",
      error: error.message,
      data: null,
    });
  }
});

articles.get("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await getNotionPage(id);
    const blocks = response.results;
    const content = blocks.map((block) => {
      return {
        content: block[block.type],
        type: block.type,
      };
    });
    res.json({
      message: "Success: Post found",
      data: content,
    });
  } catch (error) {
    res.json({
      msg: "Error: Post not found",
      error: error.message,
      data: null,
    });
  }
});

module.exports = articles;
