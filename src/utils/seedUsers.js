import bcrypt from 'bcrypt';
import userRepository from '../repositories/UserRepository.js';
import roleRepository from '../repositories/RoleRepository.js';

export default async function seedUsers() {

    const adminRole = await roleRepository.findByName("admin");

    const exists = await userRepository.findByEmail("admin@gmail.com");

    if (!exists) {
        const hashed = await bcrypt.hash("Admin123#", 10);

        await userRepository.create({
            name: "Admin",
            lastName: "System",
            email: "admin@gmail.com",
            password: hashed,
            phoneNumber: "999999999",
            birthdate: new Date("2000-01-01"),
            address: "Lima",
            roles: [adminRole._id]
        });

        console.log("Admin creado");
    }
}