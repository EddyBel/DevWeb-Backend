const API_GITHUB = "https://api.github.com/users/";
const USER_NAME = process.env.GITHUB_USER;
const TOKEN_GITHUB = process.env.GITHUB_TOKEN;

const getUserRepositories = async () => {
  try {
    const response = await fetch(
      `${API_GITHUB}${USER_NAME}/repos?per_page=100`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN_GITHUB}`,
        },
      }
    );
    if (!response) throw new Error("Repos not found");
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Server error");
  }
};

module.exports = {
  getUserRepositories,
};
