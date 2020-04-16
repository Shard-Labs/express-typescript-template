import { User } from "../models/User";

import { Seeder, Factory } from 'typeorm-seeding';

export default class CreateUsers implements Seeder {
    public async run(factory: Factory): Promise<void> {
        await factory(User)({ roles: [] }).createMany(10)
    }
}