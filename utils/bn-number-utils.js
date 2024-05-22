const numbersInBn = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const convertNumberToBN = (number) => {
  if (number) {
    number = number.toString();
    const numberInBn = number
      ?.split("")
      ?.map((num) => {
        if (parseInt(num) >= 0 && parseInt(num) <= 9)
          return numbersInBn[parseInt(num)];
        else return num;
      })
      ?.join("");
    return numberInBn;
  }
};

export default convertNumberToBN;
