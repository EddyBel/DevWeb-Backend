const { Router } = require("express");
const axios = require("axios");
const router = Router();

router.get("/repos", async (req, res) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    };
    const response = await axios.get(
      `https://api.github.com/users/${process.env.GITHUB_USER}/repos`
    );

    if (response.status === 200) {
      const hardData = response.data;
      const data = hardData?.map((item) => ({
        id: item?.id,
        name: item?.name,
        fullName: item?.full_name,
        url: item?.html_url,
        description: item?.description,
        size: item?.size,
        lang: item?.language,
        tags: item?.topics,
        licence: item?.license?.name,
      }));

      res.json({
        message: "Success: Repos not founds",
        data: data,
      });
    } else res.json({ message: "Not Found", data: null });
  } catch (error) {
    res.json({
      message: "Error: Repos not found",
      error: error.message,
      data: null,
    });
  }
});

module.exports = router;
