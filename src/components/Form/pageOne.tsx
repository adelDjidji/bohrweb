import React from "react";

function PageOne() {
  return (
    <>
      <div className="mb-16 text-xl font-semibold text-center">Avant de commencer, assurez vous d'avoir toutes ces informations :</div>
      <div className="flex flex-wrap items-center content-center justify-center ml-10 gap-52">
        <div className="w-56 text-center ">
          <div className="flex justify-center">
            <img src="/images/entreprise.png" className="mb-9" />
          </div>
          <div className="mb-4 text-xl font-semibold">L'entreprise</div>
          <div>Raison social, Adresse, SIREN, TVA</div>
        </div>
        <div className="grid w-64 text-center ">
          <div className="flex justify-center">
            <img src="/images/site.png" className="mb-9" />
          </div>
          <div className="mb-4 text-xl font-semibold">Le site</div>
          <div>Type de site, Puissance du site, Adresse ou Coordonnés GPS, Caracteristiques du site.</div>
        </div>
        <div className="text-center ">
          <div className="flex justify-center">
            <img src="/images/bancaire.png" className="mb-9" />
          </div>
          <div className="mb-4 text-xl font-semibold">Vos informations bancaires</div>
          <div className="w-64">Vos coordonnéees bancaires (RIB)</div>
        </div>
      </div>
      <br/>
      <div className="flex justify-center mt-6 space-x-2 ">
          <button type="submit" style={{ backgroundColor: "#5819F1" }} className="px-4 py-3 text-xs font-medium leading-tight text-white rounded-lg shadow-md focus:shadow-lg focus:outline-none">
            Suivant
          </button>
        </div>
    </>
  );
}

export default PageOne;
