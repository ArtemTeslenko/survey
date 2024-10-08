import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import surveyData from '@/../data/survey-config-general.json';
import { Question, SurveyData } from '@/app/components/types';
import { Answer } from '@/redux/types';

const AnswersScreen: React.FC = () => {
  const answers = useSelector((state: RootState) => state.survey.answers);
  const questionsList = (surveyData as unknown as SurveyData).questionsList;

  function getAnswerDetails(answers: Answer[], questionsList: Question[]) {
    const answerLabels = questionsList.reduce(
      (acc: Record<string, string>, question) => {
        question.options.forEach((option) => {
          acc[option.answerId] = option.label;
        });
        return acc;
      },
      {}
    );

    const answerDetails = answers.map((answer: Answer) => {
      const question = questionsList.find((question) =>
        question.options.some((option) => option.answerId === answer.answerId)
      );

      return {
        question: question ? question.question : 'Unknown Question',
        answerLabel: answerLabels[answer.answerId] || 'Unknown Answer',
      };
    });

    return answerDetails;
  }

  const answerDetails = getAnswerDetails(answers, questionsList);

  return (
    <section className="answers">
      <h1 className="answers__title">Your answers:</h1>

      <ul className="answers__list">
        {answerDetails.map((answer) => (
          <li key={answer.question} className="answers__item">
            "{answer.question}" - {answer.answerLabel}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AnswersScreen;
