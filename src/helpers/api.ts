import { CommentType, IssueAuthorType, IssueType, RequestOptions } from '../types';

const ISSUE_API_URL: string = 'https://api.github.com/repos/darginec05/next_incremental_sg/issues';

const getUserMap = (user: any): IssueAuthorType => ({
  id: user.id,
  username: user.login,
  url: user.html_url,
  avatar: user.avatar_url,
});

const getIssueMap = ({ title, id, number, body, user, created_at }: any): IssueType => ({
  title,
  id,
  number,
  body,
  created_at,
  author: getUserMap(user),
});

const getCommentMap = ({ id, body, author_association, user, created_at }: any): CommentType => ({
  id,
  body,
  created_at,
  association: author_association,
  author: getUserMap(user),
});

export async function request<T>({ url }: RequestOptions): Promise<T> {
  try {
    const api_call = await fetch(url);
    const data = await api_call.json();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getIssues(): Promise<IssueType[]> {
  try {
    const issuesResponse: any[] = await request({ url: ISSUE_API_URL });
    const issues: IssueType[] = issuesResponse.map(getIssueMap);
    return issues;
  } catch (error) {
    return error;
  }
}

export async function getIssueData(issue_id: string | string[] | undefined): Promise<IssueType> {
  try {
    const url = `${ISSUE_API_URL}/${issue_id}`;
    const issueResponse: any = await request({ url });
    if (issueResponse.message === 'Not Found') {
      throw new Error('Not found');
    }
    return getIssueMap(issueResponse);
  } catch (error) {
    return error;
  }
}

export async function getIssueComments(issue_id: string | string[] | undefined): Promise<CommentType[]> {
  try {
    const url: string = `${ISSUE_API_URL}/${issue_id}/comments`;
    const commentsResponse: any[] = await request({ url });
    const comments: CommentType[] = commentsResponse.length === 0 ? [] : commentsResponse.map(getCommentMap);
    return comments;
  } catch (error) {
    return error;
  }
}
