import { GetStaticProps } from 'next';
import { IssueList } from '../../components/IssueList';
import { IssueListProps } from '../../components/IssueList/types';
import { getIssues } from '../../helpers/api';

const IssueListPage: React.VFC<IssueListProps> = ({ issues }) => <IssueList issues={issues} />;

export const getStaticProps: GetStaticProps = async () => {
  const issues = await getIssues();

  return {
    props: { issues },
    revalidate: 3,
  };
};

export default IssueListPage;
