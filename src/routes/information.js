const { Router } = require("express");
const { getNotionDatabase } = require("../api/notion");
const Notion = Router();

/** Ruta que retorna la experiencia laboral encontrada en la pagina de notion */
Notion.get("/experience", async (req, res) => {
  try {
    const response = await getNotionDatabase(process.env.NOTION_DB_EXPERIENCE);
    const properties = response.results.map((item) => {
      const props = item.properties;
      const position = props.Nombre.title[0].plain_text;
      const company = props.Company.rich_text[0].plain_text;
      const duration = props.Duracion.rich_text[0].plain_text;
      const description = props.Descripcion.rich_text[0].plain_text;

      return {
        position,
        company,
        duration,
        description,
      };
    });

    res.json({
      message: "Success: Experience found",
      data: properties,
    });
  } catch (error) {
    res.json({
      message: "Error: Experience not found",
      error: error.message,
      data: null,
    });
  }
});

/** Ruta que retorna todos los proyectos destacados */
Notion.get("/proyects", async (req, res) => {
  try {
    const response = await getNotionDatabase(process.env.NOTION_DB_PROYECTS);
    const properties = response.results.map((item) => {
      const props = item?.properties;
      const url = props?.URL?.url;
      const description = props?.Descripcion?.rich_text[0]?.plain_text;
      const tags = props?.Etiquetas?.multi_select?.map((tag) => tag?.name);
      const covers = props?.Cover?.files?.map((file) => file?.file?.url);
      const name = props?.Nombre?.title[0]?.plain_text;

      return {
        url,
        description,
        tags,
        covers,
        name,
      };
    });

    res.json({
      message: "Success: Proyect found",
      data: properties,
    });
  } catch (error) {
    res.json({
      message: "Error: Proyect not found",
      error: error.message,
      data: null,
    });
  }
});

/** Ruta que obtiene informacion de la base de datos */
Notion.get("/information", async (req, res) => {
  try {
    const response = await getNotionDatabase(process.env.NOTION_DB_INFORMATION);
    const properties = response.results.map((item) => {
      const props = item.properties;
      const information = props.Informacion.rich_text[0].plain_text;
      const name = props.Nombre.title[0].plain_text;
      return {
        information,
        name,
      };
    });
    res.json({
      message: "Success: Information found",
      data: properties,
      response: response,
    });
  } catch (error) {
    res.json({
      message: "Error: Information not found",
      error: error.message,
      data: null,
    });
  }
});

module.exports = Notion;
