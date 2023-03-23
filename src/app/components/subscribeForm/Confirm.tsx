import {
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { successMessage, errMessage } from "../../redux/actions";
import ApiService from "../../services/ApiService";
export const Confirm = ({
  handleNext,
  handleBack,
  values: {
    fname,
    lname,
    email,
    city,
    phone,
    raisonSociale,
    siret,
    ape,
    address,
    postalCode,
    pdl,
    power,
    civility,
    func,
    departement,
  },
}: {
  handleNext: () => void;
  handleBack: () => void;
  values: {
    fname: string;
    lname: string;
    email: string;
    gender: string;
    date: string;
    city: string;
    phone: string;
    raisonSociale: string;
    siret: string;
    ape: string;
    address: string;
    postalCode: string;
    pdl: string;
    power: string;
    civility: string;
    func: string;
    departement: string;
  };
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    ApiService.Register({
      name: fname,
      last_name: lname,
      email,
      city,
      phone,
      siret,
      ape,
      address,
      postalcode: postalCode,
      pdl,
      civility,
      func,
    })
      .then((r) => {
        dispatch(successMessage(r.data.message));
        handleNext();
        setIsLoading(false);
      })
      .catch((err) => {
        dispatch(errMessage(err.response.data.message));

        setIsLoading(false);
      });
  };
  return (
    <Fragment>
      <List disablePadding>
        <ListItem>
          <ListItemText primary="First Name" secondary={fname} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Last Name" secondary={lname} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Email Address" secondary={email} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="City" secondary={city} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText
            primary="phone"
            secondary={phone.length > 0 ? phone : "Not Provided"}
          />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Raison social" secondary={raisonSociale} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="SIRET" secondary={siret} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Code APE" secondary={ape} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Adress" secondary={address} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Code postale" secondary={postalCode} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Point de Livraison" secondary={pdl} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Puissance" secondary={power} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Fonction" secondary={func} />
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Departement" secondary={departement} />
        </ListItem>
      </List>

      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button variant="contained" color="default" onClick={handleBack}>
          Back
        </Button>
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Button
            style={{ marginLeft: 20 }}
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
          >
            Confirm & Continue
          </Button>
        )}
      </div>
    </Fragment>
  );
};
