export const generateColorFromString = (str: string) => {
  let sum = 0;
  const colors = [
    "#ff2366",
    "#fd51d9",
    "#face15",
    "#8d4de8",
    "#6859ea",
    "#7ed321",
    "#56b2ba",
    "#00CCFF",
    "#FF9900",
    "#FFFF66",
  ];

  for (let x = 0; x < str.length; x++) sum += x * str.charCodeAt(x);
  return colors[sum % colors.length];
};
