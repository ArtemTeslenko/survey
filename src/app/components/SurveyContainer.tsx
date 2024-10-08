'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { saveAnswer, removeAnswer } from '@/redux/surveySlice';
import type { RootState } from '@/redux/store';
import QuestionScreen from '@/app/components/QuestionScreen';
import {
  Question,
  SurveyContainerProps,
  SurveyData,
} from '@/app/components/types';
import surveyData from '@/../data/survey-config-general.json';
import { Answer } from '@/redux/types';

const INFO = 'info';
const INFO_BLOCK = 'info-block';
const ANSWERS = 'answers';
const DARK = 'dark';

const SurveyContainer: React.FC<SurveyContainerProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { answers } = useSelector((state: RootState) => state.survey);
  const [formattedQuestion, setFormattedQuestion] = useState<string>('');
  const { screenId } = router.query;

  const questionsList = (surveyData as unknown as SurveyData).questionsList;
  const currentQuestion = questionsList.find(
    (question) => question.id === screenId
  );

  useEffect(() => {
    if (currentQuestion) {
      const questionText = currentQuestion.replaceable
        ? formatQuestion(currentQuestion.question, answers)
        : currentQuestion.question;

      setFormattedQuestion(questionText);
    }
  }, [currentQuestion]);

  useEffect(() => {
    const body = document.querySelector('body');

    if (currentQuestion?.screenType === INFO_BLOCK) {
      body?.classList.add(DARK);
    } else {
      body?.classList.remove(DARK);
    }
  }, [currentQuestion]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    if (!currentQuestion) return;

    const monoAnswer = currentQuestion.nextScreen.next;

    if (monoAnswer === INFO) {
      const parentQuestion = questionsList.find(
        (question) => question.nextScreen.next === currentQuestion.id
      );

      const prevAnswerId = answers.find(
        (answer) => answer.questionId === parentQuestion?.id
      )?.answerId;

      const nextScreen = parentQuestion?.nextScreen[prevAnswerId as string];

      router.push(`/survey/${nextScreen}`);

      return;
    }

    const nextScreenId = monoAnswer || currentQuestion.nextScreen[answerId];

    if (monoAnswer === ANSWERS) {
      router.push('/answers');

      return;
    }

    if (nextScreenId) {
      clearDependentAnswers(currentQuestion);

      dispatch(saveAnswer({ questionId, answerId }));

      router.push(`/survey/${nextScreenId}`);
    }
  };

  //to find better solution
  function formatQuestion(question: string, answers: Answer[]) {
    const gender =
      answers.find(({ questionId }) => questionId === 'id-1')?.answerId || '';

    const genderLabel =
      questionsList
        .find((question) => question.id === 'id-1')
        ?.options.find((option) => option.answerId === gender)?.label || '';

    const parenthoodAnswerId = answers.find(
      ({ questionId }) => questionId === 'id-3' || questionId === 'id-4'
    )?.answerId;

    const isParent =
      parenthoodAnswerId === 'id-a-5' || parenthoodAnswerId === 'id-a-7';

    const parentText = isParent ? 'who have children' : '';

    return question
      .replace('{gender}', genderLabel.toLowerCase())
      .replace('{Gender}', genderLabel)
      .replace('{children}', parentText);
  }

  function clearDependentAnswers(question: Question) {
    const dependentAnswer = answers.find((answer) =>
      Object.values(question?.nextScreen).includes(answer.questionId)
    );

    if (!dependentAnswer) {
      return;
    }

    const dependentQuestion = questionsList.find(
      (question) => question.id === dependentAnswer.questionId
    );

    if (dependentQuestion) {
      clearDependentAnswers(dependentQuestion);
    }

    dispatch(removeAnswer(dependentAnswer.answerId));
  }

  return (
    <div className="survey-container">
      {currentQuestion && (
        <QuestionScreen
          question={{ ...currentQuestion, question: formattedQuestion }}
          onAnswerSelect={(answerId: string) =>
            handleAnswerSelect(currentQuestion.id, answerId)
          }
        />
      )}
    </div>
  );
};

export default SurveyContainer;
