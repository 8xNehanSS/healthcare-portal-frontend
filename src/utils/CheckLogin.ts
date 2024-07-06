const CheckTokenStatus = async (user: string) => {
  if (user) {
    try {
      const response = await fetch("http://localhost:3000/checklogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: user }),
      });

      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return false;
    }
  } else {
    return false;
  }
};

async function CheckLogin() {
  const user = localStorage.getItem("token");
  let checkUser = { valid: false, type: 0, userID: 123 };
  // checkUser = await CheckTokenStatus(user);
  if (user == "123") {
    checkUser = { valid: true, type: 1, userID: 123 };
  }
  return checkUser;
}

export default CheckLogin;
