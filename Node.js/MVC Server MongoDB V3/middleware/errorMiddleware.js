export const notFoundMiddleware = (req, res) => {
  res.status(404).type('text').send('Route not found');
};

export const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  res.status(500).type('text').send('Internal server error');
};
