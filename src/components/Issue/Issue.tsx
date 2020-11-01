import { memo, ReactElement } from 'react';
import { IssueProps } from './types';

const Issue: React.VFC<IssueProps> = ({ issue, comments }): ReactElement => (
  <div>
    {JSON.stringify(issue)}
    <hr />
    <br />
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          {JSON.stringify(comment)}
          <hr />
        </div>
      ))}
    </div>
  </div>
);

export default memo(Issue);
