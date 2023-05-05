import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";
import { ReactNode } from "react";
import React from "react";


interface CustomGridToolbarProps {
  components: ReactNode[];
}

const CustomGridToolbar: React.FC<CustomGridToolbarProps> = ({ components }) => {  
  return (

    <GridToolbarContainer >
      <GridToolbarColumnsButton />
      {components.map((component, index) => (
        <React.Fragment key={index}>
          {component}
        </React.Fragment>
      ))}
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export default CustomGridToolbar;
