import { makeStyles, Paper } from "@material-ui/core"
import { useState } from "react"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import formValidation, { fieldsValidation } from "../../utils/formValidation"
import { FirstStep } from "./FirstStep"
import { SecondStep } from "./SecondStep"
import { ThirdStep } from "./ThirdStep"
import { Confirm } from "./Confirm"
import { Success } from "./Sucess"
import { RouteComponentProps } from "@reach/router"

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    paddingRight: 10,
    paddingLeft: 10,
  },
  svg: {
    verticalAlign: "middle",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 900,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(8),
      padding: theme.spacing(3),
    },
  },
}))

// Step titles
const labels = [
  "Votre entreprise",
  "Votre Besoin",
  "Contact Principal",
  "Confirmation",
]

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  gender: "",
  date: "",
  city: "",
  phone: "",
  raisonSociale: "",
  siret: "",
  ape: "",
  address: "",
  postalCode: "",
  pdl: "",
  power: "",
  civility: "",
  func: "",
  departement: "",
}

type Props = RouteComponentProps<{}>
const SubscireForm: React.FC<Props> = () => {
  const classes = useStyles()
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <StepForm />
      </Paper>
    </main>
  )
}

const StepForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})

  // Proceed to next step
  const handleNext = () => setActiveStep(prev => prev + 1)
  // Go back to prev step
  const handleBack = () => setActiveStep(prev => prev - 1)

  // Handle form change
  const handleChange = ({
    target: { name, value },
  }: {
    target: { name: string; value: string }
  }) => {
    // Set values
    setFormValues(prev => ({
      ...prev,
      [name]: value,
    }))

    // set errors
    const error = formValidation(name, value, fieldsValidation) || ""

    setFormErrors({
      [name]: error,
    })
  }

  const handleSteps = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            handleNext={handleNext}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        )
      case 1:
        return (
          <SecondStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        )
      case 2:
        return (
          <ThirdStep
            handleNext={handleNext}
            handleBack={handleBack}
            handleChange={handleChange}
            values={formValues}
            formErrors={formErrors}
          />
        )
      case 3:
        return (
          <Confirm
            handleNext={handleNext}
            handleBack={handleBack}
            values={formValues}
          />
        )
      default:
        break
    }
  }

  return (
    <>
      {activeStep === labels.length ? (
        // Last Component
        <Success />
      ) : (
        <>
          <Box style={{ margin: "30px 0 50px" }}>
            <Typography variant="h4" align="center">
              Inscrivez vous chez nous
            </Typography>
          </Box>
          <Stepper
            activeStep={activeStep}
            style={{ margin: "30px 0 15px" }}
            alternativeLabel
          >
            {labels.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {handleSteps(activeStep)}
        </>
      )}
    </>
  )
}

export default SubscireForm
