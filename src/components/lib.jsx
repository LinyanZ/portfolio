function Tag({ text, theme }) {
  return (
    <div className={`tag tag--${theme}`}>
      <p>{text}</p>
    </div>
  );
}

export { Tag };
