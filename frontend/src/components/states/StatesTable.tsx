// import { GridColDef } from "@mui/x-data-grid";
// import { DataGrid } from "@mui/x-data-grid";
// import ActionsCell from "./ActionsCell";
// import "./StatesTable.scss";
// import { IState } from "../../types/state";
// import { useState } from "react";
// import { ICity } from "../../types/city";
// import { IconButton, TextField, Typography } from "@mui/material";
// import { Add, Edit, Delete, Check, Close } from "@mui/icons-material";
// import { useCreateCity } from "../../hooks/city/useCreateCity";
// import useDeleteCity from "../../hooks/city/useDeleteCity";
// import { useUpdateCityById } from "../../hooks/city/useUpdateCity";
// import { Types } from "mongoose";
// import { currentUserState } from "../../context/atom";
// import { useRecoilValue } from "recoil";

// interface StatesTableProps {
//   rows: Array<IState>;
//   onDelete: (id: string) => void;
// }

// const StatesTable: React.FC<StatesTableProps> = ({ rows, onDelete }) => {
//   const [editingStateId, setEditingStateId] = useState<string | null>(null);
//   const [newCityName, setNewCityName] = useState<string>("");
//   const [editingCity, setEditingCity] = useState<{
//     stateId: string;
//     cityId: string;
//     name: string;
//   } | null>(null);

//   const { mutate: onAddCity } = useCreateCity();
//   const { handleDelete: onDeleteCity } = useDeleteCity();
//   const { mutate: onEditCity } = useUpdateCityById();
//   const currentUser = useRecoilValue(currentUserState);
//   const userAuth = currentUser?.auth || [];

//   const hasCreatePermission = userAuth.includes("create");
//   const hasUpdatePermission = userAuth.includes("update");
//   const hasDeletePermission = userAuth.includes("delete");

//   const columns: GridColDef[] = [
//     {
//       field: "flag",
//       headerName: "Flag",
//       flex: 1,
//       renderCell: (params) => (
//         <img
//           src={params.value}
//           alt="flag"
//           style={{ width: "50px", height: "30px", objectFit: "cover" }}
//         />
//       ),
//     },
//     { field: "name", headerName: "Name", flex: 1 },
//     {
//       field: "population",
//       headerName: "Population",
//       type: "number",
//       flex: 1,
//     },
//     {
//       field: "region",
//       headerName: "Region",
//       description: "This column is not sortable.",
//       flex: 1,
//     },
//     {
//       field: "cities",
//       headerName: "Cities",
//       flex: 3,
//       renderCell: (params) => {
//         const stateId = params.row._id;
//         const cities = params.value as ICity[];
//         return (
//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 8,
//               alignItems: "center",
//             }}
//           >
//             {cities.map((city) => (
//               <span
//                 key={city._id.toString()}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 4,
//                   padding: "6px 10px",
//                   borderRadius: "10px",
//                   border: "1px solid #d1d1d1", // Light gray border
//                   background: "transparent", // No background
//                   fontSize: "14px",
//                   fontWeight: 500,
//                   transition: "border-color 0.2s ease",
//                 }}
//               >
//                 {editingCity && editingCity.cityId === city._id.toString() ? (
//                   <TextField
//                     size="small"
//                     value={editingCity.name}
//                     onChange={(e) =>
//                       setEditingCity({ ...editingCity, name: e.target.value })
//                     }
//                     onBlur={() => {
//                       if (editingCity.name.trim()) {
//                         onEditCity({
//                           city: {
//                             _id: new Types.ObjectId(editingCity.cityId),
//                             name: editingCity.name,
//                           },
//                         });
//                       }
//                       setEditingCity(null);
//                     }}
//                     autoFocus
//                     sx={{ width: "120px" }}
//                   />
//                 ) : (
//                   <>
//                     <span>{city.name}</span>
//                     {hasUpdatePermission && (
//                     <IconButton
//                       size="small"
//                       onClick={() =>
//                         setEditingCity({
//                           stateId,
//                           cityId: city._id.toString(),
//                           name: city.name,
//                         })
//                       }
//                       sx={{
//                         color: "#1976d2",
//                         "&:hover": { background: "rgba(25, 118, 210, 0.1)" },
//                       }}
//                     >
//                       <Edit fontSize="small" />
//                     </IconButton>   )}
//   {hasUpdatePermission && (
//                     <IconButton
//                       size="small"
//                       onClick={() => onDeleteCity(city._id.toString())}
//                       sx={{
//                         color: "#d32f2f",
//                         "&:hover": { background: "rgba(211, 47, 47, 0.1)" },
//                       }}
//                     >
//                       <Delete fontSize="small" />
//                     </IconButton>
//                       )}
//                     {!hasUpdatePermission && !hasDeletePermission && (
//                         <Typography variant="body2" color="error">
//                         You don't have permission to update or delete.
//                       </Typography>
//                     )}
//                   </>
//                 )}
//               </span>
//             ))}

//             {editingStateId === stateId ? (

//               <>
//                 {hasCreatePermission ? (
//                   <>
//                 <TextField
//                   size="small"
//                   value={newCityName}
//                   onChange={(e) => setNewCityName(e.target.value)}
//                   onKeyPress={(e) =>
//                     e.key === "Enter" &&
//                     onAddCity({ stateId, cityName: newCityName })
//                   }
//                   autoFocus
//                   sx={{ width: "120px" }}
//                 />

//                 <IconButton
//                   size="small"
//                   onClick={() => {
//                     if (newCityName.trim()) {
//                       onAddCity({ stateId, cityName: newCityName });
//                       setNewCityName("");
//                       setEditingStateId(null);
//                     }
//                   }}
//                   sx={{
//                     color: "#2e7d32",
//                     "&:hover": { background: "rgba(46, 125, 50, 0.1)" },
//                   }}
//                 >
//                   <Check fontSize="small" />
//                 </IconButton>

//                 <IconButton
//                   size="small"
//                   onClick={() => setEditingStateId(null)}
//                   sx={{
//                     color: "#757575",
//                     "&:hover": { background: "rgba(117, 117, 117, 0.1)" },
//                   }}
//                 >
//                   <Close fontSize="small" />
//                 </IconButton>
//               </>
//                ) : (
//                 <Typography variant="body2" color="error">
//                   You don't have permission to add a city.
//                 </Typography>
//               )}
//             </>
//             ) : (
//               hasCreatePermission && (
//                 <IconButton
//                   size="small"
//                   onClick={() => setEditingStateId(stateId)}
//                   sx={{
//                     color: "#1976d2",
//                     "&:hover": { background: "rgba(25, 118, 210, 0.1)" },
//                   }}
//                 >
//                   <Add fontSize="small" />
//                 </IconButton>
//               )
//             )}
//           </div>
//         );
//       },
//     },

//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       renderCell: (params) => (
//         <ActionsCell
//           id={params.row.id}
//           name={params.row.name}
//           onDelete={onDelete}
//           editPath="state-form"
//         />
//       ),
//     },
//   ];

//   return (
//     <div className="responsive-table-container">
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { pageSize: 10 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         disableRowSelectionOnClick
//         sx={{ width: "100vw" }} // Full screen width
//       />
//     </div>
//   );
// };

// export default StatesTable;

import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import ActionsCell from "./ActionsCell";
import "./StatesTable.scss";
import { IState } from "../../types/state";
import { useState } from "react";
import { ICity } from "../../types/city";
import { IconButton, TextField, Typography } from "@mui/material";
import { Add, Edit, Delete, Check, Close } from "@mui/icons-material";
import { useCreateCity } from "../../hooks/city/useCreateCity";
import useDeleteCity from "../../hooks/city/useDeleteCity";
import { useUpdateCityById } from "../../hooks/city/useUpdateCity";
import { Types } from "mongoose";
import useHasPermission from "../../hooks/auth/useHasPermission";
import { Link } from "react-router";

interface StatesTableProps {
  rows: Array<IState>;
  onDelete: (id: string) => void;
}

const StatesTable: React.FC<StatesTableProps> = ({ rows, onDelete }) => {
  const [editingStateId, setEditingStateId] = useState<string | null>(null);
  const [newCityName, setNewCityName] = useState<string>("");
  const [editingCity, setEditingCity] = useState<{
    stateId: string;
    cityId: string;
    name: string;
  } | null>(null);


  const { mutate: onAddCity } = useCreateCity();
  const { handleDelete: onDeleteCity } = useDeleteCity();
  const { mutate: onEditCity } = useUpdateCityById();


  const hasCreatePermission = useHasPermission("create");
  const hasUpdatePermission = useHasPermission("update");
  const hasDeletePermission = useHasPermission("delete");

  const columns: GridColDef[] = [
    {
      field: "flag",
      headerName: "Flag",
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="flag"
          style={{ width: "50px", height: "30px", objectFit: "cover" }}
        />
      ),
    },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "population",
      headerName: "Population",
      type: "number",
      flex: 1,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
    },
    {
      field: "cities",
      headerName: "Cities",
      flex: 3,
      renderCell: (params) => {
        const stateId = params.row._id;
        const cities = params.value as ICity[];
        return (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              alignItems: "center",
            }}
          >
            {cities.map((city) => (
              <span
                key={city._id.toString()}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "6px 10px",
                  borderRadius: "10px",
                  border: "1px solid #d1d1d1",
                }}
              >
                {editingCity && editingCity.cityId === city._id.toString() ? (
                  <TextField
                    size="small"
                    value={editingCity.name}
                    onChange={(e) =>
                      setEditingCity({ ...editingCity, name: e.target.value })
                    }
                    onBlur={() => {
                      if (editingCity.name.trim()) {
                        onEditCity({
                          city: {
                            _id: new Types.ObjectId(editingCity.cityId),
                            name: editingCity.name,
                          },
                        });
                      }
                      setEditingCity(null);
                    }}
                    autoFocus
                    sx={{ width: "120px" }}
                  />
                ) : (
                  <>
                    <span>{city.name}</span>
                    <IconButton
                      size="small"
                      disabled={!hasUpdatePermission}
                      onClick={() =>
                        setEditingCity({
                          stateId,
                          cityId: city._id.toString(),
                          name: city.name,
                        })
                      }
                      sx={{
                        color: "#1976d2",
                        "&:hover": { background: "rgba(25, 118, 210, 0.1)" },
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      disabled={!hasDeletePermission}
                      onClick={() => onDeleteCity(city._id.toString())}
                      sx={{
                        color: "#d32f2f",
                        "&:hover": { background: "rgba(211, 47, 47, 0.1)" },
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </>
                )}
              </span>
            ))}

            {editingStateId === stateId ? (
              <>
                <TextField
                  size="small"
                  value={newCityName}
                  onChange={(e) => setNewCityName(e.target.value)}
                  autoFocus
                  sx={{ width: "120px" }}
                />
                <IconButton
                  size="small"
                  disabled={!hasCreatePermission}
                  onClick={() => {
                    if (newCityName.trim()) {
                      onAddCity({ stateId, cityName: newCityName });
                      setNewCityName("");
                      setEditingStateId(null);
                    }
                  }}
                >
                  <Check fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setEditingStateId(null)}
                >
                  <Close fontSize="small" />
                </IconButton>
              </>
            ) : (
              <IconButton
                size="small"
                disabled={!hasCreatePermission}
                onClick={() => setEditingStateId(stateId)}
                sx={{
                  color: "#1976d2",
                  "&:hover": { background: "rgba(25, 118, 210, 0.1)" },
                }}
              >
                <Add fontSize="small" />
              </IconButton>
            )}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <ActionsCell
          id={params.row.id}
          name={params.row.name}
          onDelete={onDelete}
          editPath="state-form"
        />
      ),
    },
  ];

  return (
    <div className="responsive-table-container">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        sx={{ width: "100vw" }}
      />
      {(!hasCreatePermission ||
        !hasUpdatePermission ||
        !hasDeletePermission) && (
        <Typography
          variant="body2"
          color="error"
          sx={{ textAlign: "center", marginTop: 2 }}
        >
          You don't have permission to perform certain actions.
          <br />
          <Link
  to="/profile?tab=permission-form"
  style={{
          marginLeft: "8px",
          textDecoration: "underline",
          color: "#1976d2",
          cursor: "pointer",
        }}
      >
        Request Permission
      </Link>
        </Typography>
      )}
    </div>
  );
};

export default StatesTable;
