const Login = () => {
  const handleSubmit = () => {};
  return (
    <div className="bg-gray-500 flex flex-col p-3 rounded-xl text-gray-900 font-medium">
      <div className="font-bold large-text">Login</div>
      <form>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          required
          className="flex "
        ></input>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          name="password"
          required
          className="flex"
        ></input>
      </form>
    </div>
  );
};

export default Login;
