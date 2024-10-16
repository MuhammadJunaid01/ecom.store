export const convertCamelCase = (str: string): string => {
  const trimmedStr = str.trim();
  return trimmedStr.charAt(0).toUpperCase() + trimmedStr.slice(1).toLowerCase();
};
export const formatCurrency = (value: number, currencyCode = "USD"): string => {
  try {
    if (isNaN(value) || typeof currencyCode !== "string") {
      throw new Error("Invalid input");
    }

    // Determine the scale of the number
    let scaledValue = value;
    let suffix = "";

    if (value >= 1e12) {
      scaledValue = value / 1e12;
      suffix = "T"; // Trillions
    } else if (value >= 1e9) {
      scaledValue = value / 1e9;
      suffix = "B"; // Billions
    } else if (value >= 1e6) {
      scaledValue = value / 1e6;
      suffix = "M"; // Millions
    }

    // Format the number
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode, // Default is USD but can be passed as BDT or others
      maximumFractionDigits: 2, // Adjust the number of decimal places as needed
    });

    return formatter.format(scaledValue) + suffix;
  } catch (error) {
    return "invalid input";
  }
};
