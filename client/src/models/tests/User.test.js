import UserModel from '../User';

test('it should accept and process parameters', () => {
    const raw = {
        id: '1',
        username: 'blah1',
        email: 'blahmanmblah@goomail.com',
        role: 'user'
    };

    const user = new UserModel(raw);

    expect(user.getId()).toBe(raw.id);
    expect(user.getUsername()).toBe(raw.username);
    expect(user.getEmail()).toBe(raw.email);
    expect(user.getRole()).toBe(raw.role);
    expect(user.getData()).toEqual(raw);
});