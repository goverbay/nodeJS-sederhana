const User = require("./User");
const Authentication = require('./Authentication');
const Guru = require("./Guru");
const Pelajaran = require("./Pelajaran");
const Siswa = require("./Siswa");
const Pelajaransiswa = require("./PelajaranSiswa");

const models = [];

models.User = User;
models.Authentication = Authentication;
models.Guru = Guru;
models.Pelajaran = Pelajaran;
models.Siswa = Siswa;
models.PelajaranSiswa = Pelajaransiswa;

//Set relationship
models.User.hasOne(models.Guru, {foreignKey: 'account_id'});
models.Guru.belongsTo(models.User, {foreignKey: 'account_id'});

models.User.hasOne(models.Siswa, {foreignKey: 'account_id'});
models.Siswa.belongsTo(models.User, {foreignKey: 'account_id'});

models.Guru.hasMany(models.Pelajaran, {foreignKey: 'id_guru'});
models.Pelajaran.belongsTo(models.Guru, {foreignKey: 'id_guru'});

models.Siswa.belongsToMany(models.Pelajaran, {
    through: models.PelajaranSiswa,
    foreignKey: 'id_siswa',
});
models.Pelajaran.belongsToMany(models.Siswa, {
    through: models.PelajaranSiswa,
    foreignKey: 'id_pelajaran',
});


module.exports = models;