import logger from '../logger';

test('it calls next()', ()=>{
    const next = jest.fn(x => x);
    logger({},{},next);
    expect(next.mock.calls.length).toBe(1);
})