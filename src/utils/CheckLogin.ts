import Data from "./userData";

const CheckTokenStatus = async () => {
  try {
    const response = await fetch("http://localhost:3000/validate", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const userData = new Data(
        true,
        data.login,
        data.loginType,
        data.user.ID,
        data.user.FirstName,
        data.user.LastName
      );
      return userData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};

async function CheckLogin() {
  let checkUser = await CheckTokenStatus();
  return checkUser;
}

export default CheckLogin;
