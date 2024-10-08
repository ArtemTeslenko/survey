import React from 'react';
import AnswerButton from '@/app/components/AnswerButton';
import { QuestionScreenProps } from '@/app/components/types';

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  onAnswerSelect,
}) => {
  const { question: questionText, options, description } = question;

  return (
    <section>
      <h1 className="question">{questionText}</h1>

      {description && <p className="answers-description">{description}</p>}

      <div className="answers-list">
        {options.map((option) => (
          <AnswerButton
            key={option.answerId}
            value={option.answerId}
            label={option.label}
            onClick={onAnswerSelect}
          />
        ))}
      </div>
    </section>
  );
};

export default QuestionScreen;
