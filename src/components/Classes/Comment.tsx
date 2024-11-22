export default class Comment {
  private _id: number;
  private _content: string;
  private _postId: number;
  private _authorId: number;
  private _createdAt: string;
  private _updatedAt: string | null;
  constructor(
    id: number,
    content: string,
    postId: number,
    authorId: number,
    createdAt: string,
    updatedAt: string | null
  ) {
    this._id = id;
    this._content = content;
    this._postId = postId;
    this._authorId = authorId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }
  get id(): number {
    return this._id;
  }

  get content(): string {
    return this._content;
  }

  get postId(): number {
    return this._postId;
  }

  get authorId(): number {
    return this._authorId;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  get updatedAt(): string | null {
    return this._updatedAt;
  }
}
