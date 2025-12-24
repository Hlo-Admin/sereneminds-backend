const fetch = require("node-fetch");

const BASE_URL = "http://localhost:5000/api/auth";

async function testAuth() {
  try {
    console.log("Testing Authentication Endpoints...\n");

    // Test registration
    console.log("1. Testing Registration...");
    const registerResponse = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      }),
    });

    const registerData = await registerResponse.json();
    console.log("Registration Response:", registerData);

    if (registerResponse.ok) {
      const token = registerData.data.token;

      // Test login
      console.log("\n2. Testing Login...");
      const loginResponse = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });

      const loginData = await loginResponse.json();
      console.log("Login Response:", loginData);

      if (loginResponse.ok) {
        // Test profile endpoint
        console.log("\n3. Testing Profile Endpoint...");
        const profileResponse = await fetch(`${BASE_URL}/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const profileData = await profileResponse.json();
        console.log("Profile Response:", profileData);
      }
    }
  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testAuth();
