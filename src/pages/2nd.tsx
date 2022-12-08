import React, { useState } from "react";
import PageOne from "../components/Form/pageOne";
function second() {
  const [formStep, setFormStep] = useState(0);

  return (
    <div>
      <div className="">
        <div>
          <div className="flex flex-wrap justify-between m-12">
            <div className="text-3xl font-semibold">Ajouter un site de production</div>
          </div>
        </div>
      </div>
      <br />
      {formStep === 0 && <PageOne/>}
    </div>
  );
}

export default second;
