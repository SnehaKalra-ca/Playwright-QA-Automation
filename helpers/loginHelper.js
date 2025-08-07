async function login(page, email, password) {
  const userEmail = page.locator('#userEmail');
  const passWord = page.locator('#userPassword');
  const logIn = page.locator("#login");

  await userEmail.fill(email);
  await passWord.fill(password);
  await logIn.click();
}

module.exports = { login };