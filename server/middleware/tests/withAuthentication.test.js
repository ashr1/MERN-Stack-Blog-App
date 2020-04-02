import withAuthentication from '../withAuthentication';

test('it should call next', () => {
    const next = jest.fn(x => x);
    withAuthentication({},{},next);
    expect(next.mock.calls.length).toBe(1);
});

test('It adds isAdmin and isAuthenticated flags to request object', () => {
    const req = {};
    const next = jest.fn(x => x);
    withAuthentication(req,{},next);
    expect(typeof req.isAdmin === 'boolean').toBe(true);
    expect(typeof req.isAuthenticated === 'boolean').toBe(true);
})