const isText = RegExp(/^[A-Z0-9 ]+$/i);
const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const isPhone = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/); // us
const isZip = RegExp(/^[0-9]{5}([- /]?[0-9]{4})?$/); // us
const isNumber = RegExp(/^\d+$/);

export default function formValidation(
  name: string,
  value: string,
  schema: any
) {
  const { validate, minLength, maxLength } = schema[name];
  let error = "";

  if (minLength && value.length < minLength)
    error = `Minimum ${minLength} characters is required.`;
  else if (maxLength && value.length > maxLength)
    error = `Maximum length of ${maxLength} exceeded!`;
  if (!validate) return;

  switch (validate) {
    case "text":
      if (!isText.test(value)) error = "This field accept text only.";
      break;

    case "number":
      if (!isNumber.test(value)) error = "This field accept numbers only.";
      break;

    case "email":
      if (!isEmail.test(value)) error = "Please enter a valid email";
      break;

    case "phone":
      if (!isPhone.test(value))
        error = "Please enter a valid phone number. i.e: xxx-xxx-xxxx";
      break;

    case "zip":
      if (!isZip.test(value)) error = "Please enter a valid zip code";
      break;

    case "checkbox":
      if (!value) error = "Please select a value";
      break;

    default:
      break;
  }

  return error;
}

export const fieldsValidation = {
  fname: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20,
  },
  lname: {
    error: "",
    validate: "text",
    minLength: 2,
    maxLength: 20,
  },
  email: {
    error: "",
    validate: "email",
  },
  gender: {},
  date: {},
  city: {
    error: "",
    validate: "text",
    minLength: 3,
    maxLength: 20,
  },
  phone: {
    error: "",
    validate: "phone",
    maxLength: 15,
  },
  raisonSociale: {
    error: "",
    validate: "text",
    minLength: 3,
  },
  siret: {
    error: "",
    validate: "text",
    minLength: 3,
  },
  ape: {
    error: "",
    validate: "text",
    minLength: 3,
  },
  address: {
    error: "",
    validate: "text",
    minLength: 3,
  },
  postalCode: {
    error: "",
    validate: "text",
    minLength: 3,
  },
  pdl: {
    error: "",
    validate: "text",
    minLength: 14,
    maxLength: 14,
  },
  power: {},
  civility: {},
  func: {
    error: "",
    validate: "text",
    minLength: 3,
  },
  departement: {
    error: "",
    validate: "text",
    minLength: 3,
  },
};
