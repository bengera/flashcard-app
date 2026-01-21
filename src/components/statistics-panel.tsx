import { StatisticCard } from "./statistic-card";
import type { Flashcard } from "../types/flashcard";

type StatisticsPanelProps = {
  cards: Flashcard[];
};

export function StatisticsPanel({ cards }: StatisticsPanelProps) {
  const mastered = cards.filter((c) => c.knownCount === 5).length;
  const inProgress = cards.filter((c) => c.knownCount > 0 && c.knownCount < 5).length;
  const notStarted = cards.filter((c) => c.knownCount === 0).length;

  return (
    <section className="statistics u-shadow">
      <h2 className="statistics__heading">Study Statistics</h2>
      <StatisticCard
        label="Total Cards"
        number={cards.length}
        icon="stats-total"
        variant="blue"
      />
      <StatisticCard
        label="Mastered"
        number={mastered} 
        icon="stats-mastered"
        variant="teal"
      />
      <StatisticCard
        label="In Progress"
        number={inProgress}
        icon="stats-in-progress"
        variant="red"
      />
      <StatisticCard
        label="Not Started"
        number={notStarted}
        icon="stats-not-started"
        variant="pink"
      />
    </section>
  );
}
