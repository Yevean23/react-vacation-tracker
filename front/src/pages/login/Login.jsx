export default function LoginPage() {
  const handleLogin = () => {};
  return (
    <>
      <h1>Login</h1>
      <input type="text" placeholder="username" />
      <input type="password" placeholder="password" />
      <button onClick={handleLogin}>Login</button>
    </>
  );
}
