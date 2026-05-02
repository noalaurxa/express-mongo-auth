import userRepository from '../repositories/UserRepository.js';

class UserService {

    async getAll() {
        return userRepository.getAll();
    }

    async getById(id) {
        const user = await userRepository.findById(id);

        if (!user) {
            const err = new Error('Usuario no encontrado');
            err.status = 404;
            throw err;
        }

        // 🧠 CÁLCULO DE EDAD
        let age = null;
        if (user.birthdate) {
            const birth = new Date(user.birthdate);
            const today = new Date();
            age = today.getFullYear() - birth.getFullYear();

            // ajuste si aún no cumple años este año
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
        }

        return {
            id: user._id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            birthdate: user.birthdate,
            age,
            roles: user.roles.map(r => r.name)
        };
    }
}

export default new UserService();