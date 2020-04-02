export default class Post {
    /**
     * @param {string} id
     * @param {string} title
     * @param {string} author
     * @param {number} createdAt
     * @param {string} body
     * @param {Array<string>} images
     */
constructor({ _id, title, author, createdAt, body, images }) {
        this._id = _id;
        this._title = title;
        this._author = author;
        this._createdAt = createdAt;
        this._body = body;
        this._images = images;
    }

     /**
     * @return {string}
     */
    getId = () => this._id;

    /**
     * @return {string}
     */
    getTitle = () => this._title;

    /**
     * @return {string}
     */
    getAuthor = () => this._author;

    /**
     * @return {number}
     */
    getCreatedAt = () => this._createdAt;

    /**
     * @return {string}
     */
    getFormattedCreatedAt = () => Date(this._createdAt).toString();

    /**
     * @return {string}
     */
    getBody = () => this._body;

    /**
     * @return {Array<string>}
     */
    getImages = () => this._images;

    /**
     * @return {{ _id: string, title: string, author: string, createdAt: number, formattedCreatedAt: string,  body: string, images: Array<string> }}
     */
    getData = () => ({
        _id: this._id,
        title: this._title,
        author: this._author,
        createdAt: this._createdAt,
        formattedCreatedAt: this.getFormattedCreatedAt(),
        body: this._body,
        images: this._images
    });
}