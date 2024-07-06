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
      return { valid: true, type: data.login, userID: data.user.userID };
    } else {
      return { valid: false, type: 0, userID: 0 };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return { valid: false, type: 0, userID: 0 };
  }
};

async function CheckLogin() {
  let checkUser = { valid: false, type: 0, userID: 123 };
  checkUser = await CheckTokenStatus();
  return checkUser;
}

export default CheckLogin;
