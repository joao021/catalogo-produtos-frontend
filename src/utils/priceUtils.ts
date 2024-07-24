export const calculateInstallments = (
  price12Months: number = 0,
  price6Months: number = 0,
  price3Months: number = 0
) => {
  const installment12Months = (price12Months / 12).toFixed(2);
  const installment6Months = (price6Months / 6).toFixed(2);
  const installment3Months = (price3Months / 3).toFixed(2);

  return {
    installment12Months,
    installment6Months,
    installment3Months,
  };
};
