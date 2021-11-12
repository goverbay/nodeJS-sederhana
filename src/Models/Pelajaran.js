const sequelize = require('./config');
const {DataTypes} = require('sequelize');

const Pelajaran = sequelize.define('pelajarans', {
    nama: {
        type: DataTypes.STRING,
        allowNull: false
    },
    kode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    id_guru: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "gurus",
            key: "id",
        }
    }
},{
    freezeTableName: true,
    timestamps: false,
});

module.exports = Pelajaran;
