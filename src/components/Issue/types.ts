import { CommentType, IssueType } from '../../types';

export interface IssueProps {
  issue: IssueType;
  comments: CommentType[];
  error?: boolean;
}
