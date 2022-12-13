import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Fragment } from "react";

export const FirstStep = ({
  handleNext,
  handleChange,
  values: { raisonSociale, siret, ape, address, postalCode, city },
  formErrors,
}: {
  handleNext: () => void;
  handleChange: (e: any) => void;
  values: {
    raisonSociale: string;
    siret: string;
    ape: string;
    address: string;
    postalCode: string;
    city: string;
  };
  formErrors: {
    raisonSociale?: string;
    siret?: string;
    ape?: string;
    address?: string;
    postalCode?: string;
    city?: string;
  };
}) => {
  // Check if all values are not empty or if there are some error
  const isValid =
    raisonSociale.length > 0 &&
    !formErrors.raisonSociale &&
    siret.length > 0 &&
    !formErrors.siret &&
    address.length > 0 &&
    !formErrors.address &&
    ape.length > 0 &&
    !formErrors.ape &&
    city.length > 0 &&
    !formErrors.city &&
    postalCode.length > 0 &&
    !formErrors.postalCode;

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Raison sociale"
            name="raisonSociale"
            placeholder="Raison sociale"
            margin="normal"
            value={raisonSociale || ""}
            onChange={handleChange}
            error={!!formErrors.raisonSociale}
            helperText={formErrors.raisonSociale}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="SIRET"
            name="siret"
            placeholder="SIRET"
            margin="normal"
            value={siret || ""}
            onChange={handleChange}
            error={!!formErrors.siret}
            helperText={formErrors.siret}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="APE"
            name="ape"
            placeholder="APE"
            margin="normal"
            value={ape || ""}
            onChange={handleChange}
            error={!!formErrors.ape}
            helperText={formErrors.ape}
            required
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="address"
            name="address"
            placeholder="Your address"
            type="text"
            value={address || ""}
            onChange={handleChange}
            margin="normal"
            error={!!formErrors.address}
            helperText={formErrors.address}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Code postal"
            name="postalCode"
            placeholder="Votre Code postal"
            type="text"
            value={postalCode || ""}
            onChange={handleChange}
            margin="normal"
            error={!!formErrors.postalCode}
            helperText={formErrors.postalCode}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth required margin="normal">
            <InputLabel>Ville</InputLabel>
            <Select value={city} onChange={handleChange} name="city">
              <MenuItem value={"Alger"}>Alger</MenuItem>
              <MenuItem value={"Rabat"}>Rabat</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        {/*@ts-ignore*/}
        <Button
          variant="contained"
          disabled={!isValid}
          color="primary"
          onClick={isValid ? handleNext : null}
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
};
