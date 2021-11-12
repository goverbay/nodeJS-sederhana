const sequelize = require('./config');
const {DataTypes} = require('sequelize');

const Siswa = sequelize.define('siswas', {
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nis: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    jenis_kelamin: {
        type: DataTypes.ENUM('Laki-Laki','Perempuan'),
        allowNull: false,
    },
    nomor_telpon: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'users',
            key: 'id',
        }
    },
}, {
    freezeTableName: true,
    timestamps: false,
});

module.exports = Siswa;