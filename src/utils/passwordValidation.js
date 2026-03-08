export function passwordValidation(password) {
  if (!password) return 0;

  let score = 0;

  const length = password.length;

  // الطول
  if (length >= 8) score += 2;
  if (length >= 12) score += 2;

  // حروف صغيرة
  if (/[a-z]/.test(password)) score += 1;

  // حروف كبيرة
  if (/[A-Z]/.test(password)) score += 1;

  // أرقام
  if (/[0-9]/.test(password)) score += 1;

  // رموز خاصة
  if (/[^A-Za-z0-9]/.test(password)) score += 2;

  // تنوع الأحرف
  const uniqueChars = new Set(password).size;
  if (uniqueChars > length / 2) score += 1;

  // منع تجاوز 10
  return Math.min(score, 10);
}