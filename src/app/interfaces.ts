export interface IRegister {
  email: string;
  siret: string;
  ape: string;
  address: string;
  postalcode: string;
  city: string;
  pdl: string;
  name: string;
  last_name: string;
  phone: string;
  func: string;
  civility: string;
}

export interface LayoutProps {
  children: JSX.Element;
}
