import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

    name: {
        type: String
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (v) {
                return /^(?=.*[A-Z])(?=.*\d)(?=.*[#\$%&*@]).{8,}$/.test(v);
            },
            message: "La password debe tener mínimo 8 caracteres, 1 mayúscula, 1 dígito y 1 caracter especial"
        }
    },

    phoneNumber: {
        type: String,
        required: true
    },

    birthdate: {
        type: Date,
        required: true
    },

    url_profile: {
        type: String
    },

    address: {
        type: String
    },

    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    }]

}, { timestamps: true });

export default mongoose.model('User', UserSchema);