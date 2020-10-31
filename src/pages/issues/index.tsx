import { GetStaticProps } from 'next';
import { IssueList } from '../../components/IssueList';
import { IssueType, IssueListProps } from '../../components/IssueList/types';
import { request } from '../../helpers/api';

const IssueListPage: React.VFC<IssueListProps> = ({ issues }) => <IssueList issues={issues} />;

export const getStaticProps: GetStaticProps = async () => {
  const url = 'https://api.github.com/repos/darginec05/next_incremental_sg/issues';
  const issues: IssueType[] = await request({ url });

  return {
    props: {
      issues,
    },
    revalidate: 3,
  };
};

export default IssueListPage;
