import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../models/User';

const maxAge: number = 99;
const minAge: number = 16;

define(User, (faker: typeof Faker) => {
    const user = new User();
    const gender = faker.random.number(1);
    user.firstName = faker.name.firstName(gender);
    user.lastName = faker.name.lastName(gender);
    user.age = Math.floor(Math.random() * (maxAge - minAge + 1) + minAge);
    return user
  })