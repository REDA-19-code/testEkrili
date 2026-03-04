

export function isValidAlgerianPhone(phone) {
  const regex = /^(?:\+213|0)(5|6|7)[0-9]{8}$/;
  return regex.test(phone);
}


