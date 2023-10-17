const responseBody = (data, error, res, status) => {
  if (data) {
    res.status(status ? status : 201).send({
      status: status ? status : 201,
      data: data,
      error: null,
    });
  }
  if (error) {
    if (error?.name === "SequelizeValidationError") {
      let result = [];
      error?.errors.forEach((element) => {
        result.push({ message: element.message });
      });
      res.status(400).send({
        status: 400,
        data: null,
        error: result,
      });
    } else {
      res.status(status ? status : 500).send({
        status: status ? status : 500,
        data: null,
        error: error,
      });
    }
  }
};

module.exports = responseBody;
