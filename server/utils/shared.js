const typeImage = { profile: 'profile', post: 'post' };

const responseBody = (data, error, res, status) => {
  if (data) {
    res.status(status || 201).send({
      status: status || 201,
      data,
      error: null
    });
  }
  if (error) {
    if (error?.name === 'SequelizeValidationError') {
      const result = [];
      error?.errors.forEach((element) => {
        result.push({ message: element.message });
      });
      res.status(400).send({
        status: 400,
        data: null,
        error: result
      });
    } else {
      res.status(status || 500).send({
        status: status || 500,
        data: null,
        error
      });
    }
  }
};

module.exports = { typeImage, responseBody };
