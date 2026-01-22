export const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  re.status(500).json({
    message: "Internal Server Error",
  });
};
