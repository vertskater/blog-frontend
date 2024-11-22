import Comment from "./Comment.tsx";

export default class Post {
  private readonly _id: number;
  private readonly _title: string;
  private readonly _content: string;
  private readonly _published: boolean;
  private readonly _authorId: number;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date | null;
  private readonly _comments?: Comment[];
  constructor(
    id: number,
    title: string,
    content: string,
    published: boolean,
    authorId: number,
    createdAt: Date,
    updatedAt: Date | null,
    comments?: Comment[]
  ) {
    this._id = id;
    this._title = title;
    this._content = content;
    this._published = published;
    this._authorId = authorId;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._comments = comments;
  }

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  get published(): boolean {
    return this._published;
  }

  get authorId(): number {
    return this._authorId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date | null {
    return this._updatedAt;
  }
  get comments(): Comment[] | [] {
    return this._comments ?? [];
  }
}
