import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
export const SecondStep = ({
  handleNext,
  handleBack,
  handleChange,
  values: { pdl, power },
  formErrors,
}: {
  handleNext: () => void;
  handleBack: () => void;
  handleChange: (e: any) => void;
  values: {
    pdl: string;
    power: string;
  };
  formErrors: {
    pdl?: string;
    power?: string;
  };
}) => {
  // Check if all values are not empty or if there are some error
  const isValid =
    pdl.length > 0 && !formErrors.pdl && power.length > 0 && !formErrors.power;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="PDL"
            name="pdl"
            placeholder="Point de Livraison PDL"
            value={pdl || ""}
            margin="normal"
            onChange={handleChange}
            error={!!formErrors.pdl}
            helperText={formErrors.pdl}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required margin="normal">
            <InputLabel>Puissance</InputLabel>
            <Select value={power} onChange={handleChange} name="power">
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
            </Select>
          </FormControl>
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
