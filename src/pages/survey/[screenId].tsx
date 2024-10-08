import { GetStaticPaths, GetStaticProps } from 'next';
import SurveyContainer from '@/app/components/SurveyContainer';
import surveyData from '@/../data/survey-config-general.json';
import Header from '@/app/components/Header';
import SurveyNav from '@/app/components/SurveyNav';
import { SurveyPageProps } from '@/pages/survey/types';
import '@/app/styles/pages/survey.scss';

const SurveyPage = ({ screenId }: SurveyPageProps) => {
  return (
    <main>
      <Header navContent={<SurveyNav />} />

      <SurveyContainer screenId={screenId as string} />
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = surveyData.questionsList.map((question) => ({
    params: { screenId: question.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const screenId = params?.screenId as string;

  return {
    props: {
      screenId,
    },
  };
};

export default SurveyPage;
