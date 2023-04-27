import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import ListAllFilter from "../../models/RequestsGrid/ListAllFilter";
import ApproveDialogAlerts from "../Alert/ApproveDialogAlert";
import AddRoleButton from "../../models/roles/AddRole";
import { ReactNode } from "react";


interface CustomGridToolbarProps {
    components: ReactNode[];
}

const CustomGridToolbar: React.FC<CustomGridToolbarProps> = ({components}) => {
    return (

      <GridToolbarContainer >
        <GridToolbarColumnsButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        {components.map((component, index) => (
            <>{component}</>
        ))}
      </GridToolbarContainer>
    );
  }
  export default CustomGridToolbar;
