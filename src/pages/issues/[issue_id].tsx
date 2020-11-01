import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { Issue } from '../../components/Issue';
import { IssueProps } from '../../components/Issue/types';
import { getIssueComments, getIssueData, getIssues } from '../../helpers/api';
import { IssueType } from '../../types';

const IssuePage: React.VFC<IssueProps> = ({ issue, comments, error = false }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) {
    return (
      <div>Not found</div>
    );
  }

  return (
    <Issue issue={issue} comments={comments} />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const issues: IssueType[] = await getIssues();
  const paths = issues.map((issue) => ({ params: { issue_id: `${issue.number}` } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  try {
    const issue = await getIssueData(params!.issue_id);
    const comments = await getIssueComments(params!.issue_id);
    return {
      props: {
        issue,
        comments,
      },
      revalidate: 3,
    };
  } catch (error) {
    return {
      props: {
        status: 404,
        message: 'NOT_FOUND',
        error: true,
      },
      notFound: true,
    };
  }
};

export default IssuePage;
