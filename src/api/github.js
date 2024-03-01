const API_GITHUB = "https://api.github.com/users/";
const USER_NAME = env.VITE_GITHUB_USER_NAME || "eddybel";
const TOKEN_GITHUB = "";

const getUserRepositories = async () => {
  try {
    const response = await fetch(`${API_GITHUB}${USER_NAME}/repos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN_GITHUB}`,
      },
    });
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
