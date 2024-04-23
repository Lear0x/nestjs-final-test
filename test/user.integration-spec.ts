import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/user/user.entity';

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: getRepositoryToken(User),
					useValue: {
						save: jest.fn().mockImplementation((user) => Promise.resolve(user)),
					},
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	afterEach(async () => {
		// Réinitialiser les données si nécessaire
	});

	describe('createUser', () => {
		it('should create a new user', async () => {
			const username = 'testuser';
			const email = 'test@example.com';

			const user = await service.createUser(username, email);

			expect(user).toBeDefined();
			expect(user.username).toBe(username);
			expect(user.email).toBe(email);
		});
	});
});
