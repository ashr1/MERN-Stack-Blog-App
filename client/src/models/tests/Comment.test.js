import CommentModel from '../Comment';

test('it should accept and process parameters', () => {
    
    const raw = {
        _id: '1',
        content: 'Great post. Simple exercises are the best.',
        createdAt: '1584403988835',
        user_id: '5e71b55fac5c2829b071082f',
        post_id: '5e71b55fac5c2829b0710844'
    };

    const post = new CommentModel(raw);

    expect(post.getId()).toBe(raw._id);
    expect(post.getContent()).toBe(raw.content);
    expect(post.getCreatedAt()).toBe(raw.createdAt);
    expect(post.getPostId()).toBe(raw.post_id);
    expect(post.getUserId()).toBe(raw.user_id);
    expect(post.getData()).toEqual(Object.assign(
        {},
        raw
    ));
})