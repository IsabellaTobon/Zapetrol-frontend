import React from 'react';
import { usePetrolData } from './modules/petrol/hooks/usePetrolData';
import { ProvinceSelector } from './modules/petrol/components/ProvinceSelector';
import { MunicipalitySelector } from './modules/petrol/components/MunicipalitySelector';
import { StationList } from './modules/petrol/components/StationList';

const App: React.FC = () => {
  const {
    provinces,
    municipalities,
    stations,
    selectedProvince,
    setSelectedProvince,
    selectedMunicipality,
    setSelectedMunicipality
  } = usePetrolData();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Consulta de Gasolineras</h1>

      <ProvinceSelector
        provinces={provinces}
        selectedId={selectedProvince}
        onSelect={setSelectedProvince}
      />

      {selectedProvince && (
        <MunicipalitySelector
          municipalities={municipalities}
          selectedId={selectedMunicipality}
          onSelect={setSelectedMunicipality}
        />
      )}

      {selectedMunicipality && <StationList stations={stations} />}
    </div>
  );
};

export default App;
