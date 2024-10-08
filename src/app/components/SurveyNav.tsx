import React from 'react';
import { useRouter } from 'next/router';

const SurveyNav: React.FC = () => {
  const router = useRouter();

  return <button onClick={() => router.back()} className="back"></button>;
};

export default SurveyNav;
