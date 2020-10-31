export interface IssueType {
  repository: string;
  url: string;
  id: number;
  node_id: string;
  title: string;
  body: string;
}

export interface IssueListProps {
  issues: IssueType[];
}
