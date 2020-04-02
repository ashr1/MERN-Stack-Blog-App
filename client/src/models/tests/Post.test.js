import PostModel from '../Post';

test('it should accept and process parameters', () => {
    const createdAt = Date.now();
    const raw = {
        _id: '1',
        title: 'How to Make Homemade Cake',
        author: 'Myself',
        createdAt,
        body: 'Use flour. Make Batter. Bake.',
        images: [
            'https://www.joyofbaking.com/images/poundcake.jpg'
        ]
    };

    const post = new PostModel(raw);

    expect(post.getId()).toBe(raw._id);
    expect(post.getTitle()).toBe(raw.title);
    expect(post.getAuthor()).toBe(raw.author);
    expect(post.getCreatedAt()).toBe(raw.createdAt);
    expect(post.getBody()).toBe(raw.body);
    expect(post.getImages()).toBe(raw.images);
    expect(post.getData()).toEqual(Object.assign(
        {},
        raw,
        { formattedCreatedAt: Date(createdAt).toString() }
    ));
})