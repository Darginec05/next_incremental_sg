export type RequestOptions = {
  url: string;
};

export type IssueAuthorType = {
  id: number;
  username: string;
  avatar: string;
  url: string;
}

export type IssueType = {
  id: number;
  title: string;
  number: number;
  body: string;
  author: IssueAuthorType;
  created_at: Date;
}

export type CommentType = Omit<IssueType, 'title' | 'number'> & {
  association: string;
}
