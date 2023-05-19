//models/spot.js

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner' });
      Spot.belongsToMany(models.User, {
        through: models.Booking,
        foreignKey: 'spotId',
        as: 'Bookings'
      });
      Spot.hasMany(models.Review, { foreignKey: 'spotId', as: 'Reviews' });
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', as: 'SpotImages' });
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
