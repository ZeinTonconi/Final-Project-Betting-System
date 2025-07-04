import {
  Box,
  Button,
  Avatar,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Product } from "../interfaces/ProductInterface.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";

interface ProductsTableProps {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
}

export const ProductsTable = ({
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) => {

    const {t} = useTranslation()

  const columns = [
    {
      field: "image",
      headerName: t("productTable.image"),
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Avatar
            variant="rounded"
            src={params.value as string}
            sx={{ width: 56, height: 56 }}
          />
        </Box>
      ),
      align: "center",
    },
    { field: "title", headerName: t("productTable.name"), flex: 0.3 },
    {
      field: "description",
      headerName: t("productTable.description"),
      flex: 1,
    },
    {
      field: "basePrice",
      headerName: t("productTable.base"),
      width: 120,
      renderCell: (params) => `${params.value} $`,
    },
    {
      field: "actions",
      headerName: t("productTable.actions"),
      width: 180,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit">
            <IconButton color="info" onClick={() => onEdit(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => onDelete(params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", overflowX: "auto", mb: 2 }}>
      <Box sx={{ minWidth: { xs: "100%", sm: 600 } }}>
        <DataGrid
          rows={products}
          columns={columns as GridColDef[]}
          pageSize={10}
          getRowId={(row) => row.id!}
          disableColumnMenu
          density="compact"
          rowHeight={150}
        />
      </Box>
    </Box>
  );
};
