import { ReactElement } from 'react';
import Link from 'next/link';
import { IssueListProps } from './types';

const IssueList: React.VFC<IssueListProps> = ({ issues }): ReactElement => (
  <div>
    <div>
      length:
      {issues.length}
    </div>
    <br />
    <div>
      {issues.map((issue) => (
        <Link key={issue.id} href="/issues/[issue_id]" as={`/issues/${issue.number}`}>
          <a>
            <div>{issue.title}</div>
            <div>{issue.body}</div>
            <hr />
            <br />
          </a>
        </Link>
      ))}
    </div>
  </div>
);

export default IssueList;
