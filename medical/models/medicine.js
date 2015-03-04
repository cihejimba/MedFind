module.exports = function(sequelize, DataTypes){
  console.log('hello im in the medicine model');
  var Medicine = sequelize.define('medicine', {
    name: DataTypes.STRING,
    active_ingredient: DataTypes.STRING,
    price: DataTypes.INTEGER,
    effective_date: DataTypes.DATE,
    pack_size: DataTypes.STRING
  });
  return Medicine;
};
