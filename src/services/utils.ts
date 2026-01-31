export function showMoney(money: number | string, showToman: boolean = true) {
  try {
    return `${Number(money).toLocaleString("fa")}${showToman ? " تومان" : ""}`;
  } catch (error) {
    console.log(error);
  }
}
