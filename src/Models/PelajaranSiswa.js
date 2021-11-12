const sequelize = require('./config');
const {DataTypes} = require('sequelize');

const Pelajaransiswa = sequelize.define('detail_pelajaran_siswa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    id_pelajaran: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'pelajarans',
            key: 'id',
        },
    },
    id_siswa: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'siswas',
            key: 'id',
        }
    },
    tanggal_ambil: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = Pelajaransiswa;