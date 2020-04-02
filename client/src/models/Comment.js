export default class Comment {
    /**
     * @param {string} _id
     * @param {string} content
     * @param {string} createdAt
     * @param {string} post_id
     * @param {string} user_id
     */
    constructor({ _id, content, createdAt, post_id, user_id }) {
        this._id = _id;
        this.content = content;
        this.createdAt = createdAt;
        this.user_id = user_id;
        this.post_id = post_id;
    }

    /**
     * @return {string}
     */
    getId = () => this._id;

    /**
     * @return {string}
     */
    getContent = () => this.content;

    /**
     * @return {string}
     */
    getCreatedAt = () => this.createdAt;

    /**
     * @return {string}
     */
    getPostId = () => this.post_id;

    /**
     * @return {string}
     */
    getUserId = () => this.user_id;

    /**
     * @return {{ _id: string, content: string, createdAt: string, post_id: string, user_id: string }}
     */
    getData = () => ({
        _id: this._id,
        content: this.content,
        createdAt: this.createdAt,
        post_id: this.post_id,
        user_id: this.user_id
    });

}
