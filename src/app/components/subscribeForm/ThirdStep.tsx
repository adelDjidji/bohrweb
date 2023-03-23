import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
export const ThirdStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { civility, fname, lname, email, func, departement, phone },
  formErrors,
}: {
  handleNext: () => void;
  handleBack: () => void;
  handleChange: (e: any) => void;
  values: {
    civility: string;
    fname: string;
    lname: string;
    email: string;
    func: string;
    departement: string;
    phone: string;
  };
  formErrors: {
    civility?: string;
    fname?: string;
    lname?: string;
    email?: string;
    func?: string;
    departement?: string;
    phone?: string;
  };
}) => {
  // Check if all values are not empty or if there are some error
  const isValid =
    civility.length > 0 &&
    !formErrors.civility &&
    fname.length > 0 &&
    !formErrors.fname &&
    lname.length > 0 &&
    !formErrors.lname &&
    email.length > 0 &&
    !formErrors.email &&
    departement.length > 0 &&
    !formErrors.departement &&
    phone.length > 0 &&
    !formErrors.phone &&
    func.length > 0 &&
    !formErrors.func;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth required margin="normal">
            <InputLabel>civility</InputLabel>
            <Select value={civility} onChange={handleChange} name="civility">
              <MenuItem value={"M"}>M</MenuItem>
              <MenuItem value={"Mme"}>Mme</MenuItem>
              <MenuItem value={"Mlle"}>Mlle</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Prenom"
            name="fname"
            placeholder="Prenom"
            value={fname || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.fname}
            helperText={formErrors.fname}
            required
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Nom"
            name="lname"
            placeholder="Nom"
            value={lname || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.lname}
            helperText={formErrors.lname}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            placeholder="E-mail"
            value={email || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Function"
            name="func"
            placeholder="Fonction"
            value={func || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.func}
            helperText={formErrors.func}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Departement"
            name="departement"
            placeholder="Departement"
            value={departement || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.departement}
            helperText={formErrors.departement}
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Telephone"
            name="phone"
            placeholder="Telephone"
            value={phone || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
            required
          />
        </Grid>
      </Grid>
      <div
        style={{ display: "flex", marginTop: 50, justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          color="default"
          onClick={handleBack}
          style={{ marginRight: 10 }}
        >
          Back
        </Button>
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
    </>
  );
};
