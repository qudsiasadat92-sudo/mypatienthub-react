const SAMPLE_POINTS = [40, 55, 48, 62, 58, 70, 65, 78, 72, 80];
const WIDTH = 320;
const HEIGHT = 90;

export default function HealthSparkline({ points = SAMPLE_POINTS }) {
  const max = Math.max(...points);
  const min = Math.min(...points);

  const coords = points.map((val, i) => {
    const x = (i / (points.length - 1)) * WIDTH;
    const y = HEIGHT - ((val - min) / (max - min || 1)) * (HEIGHT - 10) - 5;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const path = "M" + coords.join(" L");

  return (
    <div className="spark">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" height="100%" preserveAspectRatio="none">
        <path
          d={path}
          fill="none"
          stroke="#2c3e66"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
