import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport } from "@mui/x-data-grid";
import React, { ReactNode } from "react";

interface CustomGridToolbarProps {
  components: ReactNode[];
}

const CustomGridToolbar: React.FC<CustomGridToolbarProps> = ({ components }) => {  
  return (

    <GridToolbarContainer >
      <GridToolbarColumnsButton />
      {components.map((component) => (
        <React.Fragment key={component?.toString()}>
          {component}
        </React.Fragment>
      ))}
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export default CustomGridToolbar;
