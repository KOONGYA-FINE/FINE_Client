import { useTranslation } from "react-i18next";

const useGetinterestArray = () => {
  const { t } = useTranslation();
  return [
    { id: "travel", content: t(`interest.travel`) },
    { id: "music", content: t(`interest.music`) },
    { id: "game", content: t(`interest.game`) },
    { id: "reading", content: t(`interest.reading`) },
    { id: "movies", content: t(`interest.movies`) },
    { id: "cooking", content: t(`interest.cooking`) },
    { id: "pets", content: t(`interest.pets`) },
    { id: "sports", content: t(`interest.sports`) },
    { id: "camping", content: t(`interest.camping`) },
    { id: "running", content: t(`interest.running`) },
    { id: "hiking", content: t(`interest.hiking`) },
    { id: "photography", content: t(`interest.photography`) },
    { id: "drama", content: t(`interest.drama`) },
    { id: "studying", content: t(`interest.studying`) },
    { id: "foodExploration", content: t(`interest.foodExploration`) },
    { id: "idol", content: t(`interest.idol`) },
  ];
};

export default useGetinterestArray;
