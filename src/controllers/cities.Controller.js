const getCities = (req, res) => {
  res.json({
    cities: [
      {
        nation: "Japan",
        city: "Akiha",
      },
      {
        nation: "Japan",
        city: "Tokio",
      },
      {
        nation: "Japan",
        city: "Shibuya",
      },
    ],
  });
};

const getCity = (req, res) => {
    res.json({
        nation: "Argentina",
        city: "Mendoza"
    })
};

const postCity = (req, res) => {};

module.exports = { getCities, getCity, postCity };
