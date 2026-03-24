

// export const formatName = (text: string) => {
//   const lettersOnly = text.replace(/[^a-zA-Z\s]/g, '');

//   return lettersOnly
//     .toLowerCase()
//     .replace(/\b\w/g, c => c.toUpperCase());
// };



export const formatName = (text: string) => {
  const lettersOnly = text.replace(/[^a-zA-Z\s]/g, '');

  const noExtraSpaces = lettersOnly.replace(/\s+/g, ' ');

  return noExtraSpaces
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
};

export const validateMobile = (text: string) => {
  let digits = text.replace(/\D/g, '');

  digits = digits.slice(0, 10);

  if (digits.length > 0 && !/^[6-9]/.test(digits)) {
    return null;
  }

  if (/(\d)\1{3}/.test(digits)) {
    return null;
  }

  return digits;
};



// /^[a-zA-Z0-9]+@[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,}$/

// export const validateEmail = (text: string) => {
//   // Remove spaces, only allow valid email characters
//   return text.replace(/[^a-zA-Z0-9@._+-]/g, '').slice(0, 254);
// };







export const validateEmail = (text: string) => {
  const cleaned = text.replace(/[^a-zA-Z0-9@._+-]/g, '').slice(0, 254);

  const parts = cleaned.split('@');
  if (parts.length > 2) {
    return parts[0] + '@' + parts.slice(1).join('');
  }

  if (parts.length === 2) {
    const local = parts[0];
    const domain = parts[1].replace(/[^a-zA-Z0-9.]/g, ''); 
    return local + '@' + domain;
  }

  
  return cleaned.replace(/[^a-zA-Z0-9@]/g, '');
};


