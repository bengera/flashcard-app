type StatisticVariant = "blue" | "teal" | "red" | "pink";

type StaticCardProps = {
  label: string;
  number: number;
  icon: string;
  variant: StatisticVariant;
};

export function StatisticCard({
  label,
  number,
  icon,
  variant,
}: StaticCardProps) {
  return (
    <div className="statistics__card u-shadow">
      <div className="statistics__card-left-content">
        <p className="statistics__card-label">{label}</p>
        <p className="statistics__card-number">{number}</p>
      </div>
      <div
        className={`statistics__card-icon-container statistics__card--${variant}`}
      >
        <img
          src={`/images/icon-${icon}.svg`}
          alt={`icon-${label}`}
          className="statistics__card-icon"
        />
      </div>
    </div>
  );
}
