import { useTheme } from "../contexts/themeContext";

function DetailBlock({ title, startDate, endDate, description, remark }) {
  const [theme] = useTheme();

  return (
    <div className={`detail-container detail-container--${theme}`}>
      <div className="detail-top-row">
        <p className="detail-title">{title}</p>
        <p className="detail-date">{`${startDate} - ${endDate}`}</p>
      </div>
      <p className={`detail-description detail-description--${theme}`}>
        {description}
      </p>
      {remark && (
        <ul className="">
          {remark.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { DetailBlock };
