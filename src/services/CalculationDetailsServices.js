class CalculationDetailsServices {
  static formatNumber = (num) => {
    if (!num) return num;
    const parts = num.toString().split('.');
    if (parts[1] && parts[1].length > 2) {
      return Number(num).toFixed(2);
    }
    return num;
  };

  static renderCharacteristicName = (name) => {
    const regex = /<small>(.*?)<\/small>/g;
    const result = [];
    let lastIndex = 0;
    let match;

    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(name)) !== null) {
    // Text before <small>
      if (match.index > lastIndex) {
        result.push({
          isSmall: false,
          text: name.slice(lastIndex, match.index),
        });
      }

      // Text inside <small>
      result.push({
        isSmall: true,
        text: match[1],
      });

      // Update lastIndex
      lastIndex = regex.lastIndex;
    }

    // Remaining text after last </small>
    if (lastIndex < name.length) {
      result.push({
        isSmall: false,
        text: name.slice(lastIndex),
      });
    }

    return (
      <div style={{ display: 'flex' }}>
        {result.map((i) => (i.isSmall ? (
          <span>{i.text}</span>
        ) : (
          <p>{i.text}</p>
        )))}
      </div>
    );
  };
}

export default CalculationDetailsServices;
