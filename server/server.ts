import app from "./app";

// Create server
const server = app.listen(app.get("port"), (): void => {
  console.log(
    "Server is running on port %d in %s mode",
    app.get("port"),
    app.get("env")
  );
});

export default server;
