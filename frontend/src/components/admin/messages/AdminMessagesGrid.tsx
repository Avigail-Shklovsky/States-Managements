// AdminMessagesGrid.tsx
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef} from "@mui/x-data-grid";
import { UsernameCell } from "./AdminMessages";
import { IMessage } from "../../../types/message";
import { useUpdateMessageById } from "../../../hooks/messages/useUpdateMessageById";

interface AdminMessagesGridProps {
  rows: any[];
}

const AdminMessagesGrid: React.FC<AdminMessagesGridProps> = ({ rows }) => {

  const { mutate: updateMessageById } = useUpdateMessageById();
  const columns: GridColDef[] = [
    {
      field: "username",
      headerName: "Username",
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{align:'center'}}>
          <UsernameCell userId={params.row.userId} />
        </Typography>
      ),
    },
    { field: "actionType", headerName: "Action Type", width: 130 },
    { field: "dateOpen", headerName: "Open Date", width: 180 },
    { field: "dateClose", headerName: "Close Date", width: 180 },
    {
      field: "approved",
      headerName: "Approve?",
      width: 200,
      align: "center",
      renderCell: (params) => {
        const isClosed = params.row.dateClose !== "Open";
        if (isClosed) {
          return (
            <Typography
              variant="body2"
              sx={{
                color: params.row.approved ? "#28a745" : "#dc3545",
                fontWeight: "bold",
                textAlign: "center",
                width: "100%",
              }}
            >
              {params.row.approved ? "Approved" : "Declined"}
            </Typography>
          );
        }

            const handleApproval = (message: IMessage, status: boolean) => {
    const newMessage: IMessage = {
      ...message,
      approved: status,
      _id: message._id,
      read: true,
      dateClose: new Date(),
    };
  
    updateMessageById({ message: newMessage });

 }
        return (
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleApproval(params.row.originalMessage, true)}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleApproval(params.row.originalMessage, false)}
            >
              Decline
            </Button>
          </Box>
        );
      },
    },
  ];
  return(
  <DataGrid
    rows={rows}
    columns={columns}
    initialState={{
      pagination: { paginationModel: { pageSize: 10 } },
    }}
    pageSizeOptions={[5, 10]}
    disableRowSelectionOnClick
    getRowClassName={(params) => params.row.dateClose !== "Open" ? "closed-row" : ""}
    sx={{
      "& .closed-row": {
        backgroundColor: "#f5f5f5",
        opacity: 0.8,
      },
    }}
  />
  )
}
;

export default AdminMessagesGrid;
