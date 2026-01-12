import { StatisticCard } from "./statistic-card";
import type { Flashcard } from "../types/flashcard";

type StatisticsPanelProps = {
  cards: Flashcard[];
};

export function StatisticsPanel({ cards }: StatisticsPanelProps) {
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
        number={11}
        icon="stats-mastered"
        variant="teal"
      />
      <StatisticCard
        label="In Progress"
        number={21}
        icon="stats-in-progress"
        variant="red"
      />
      <StatisticCard
        label="Not Started"
        number={8}
        icon="stats-not-started"
        variant="pink"
      />
    </section>
  );
}
