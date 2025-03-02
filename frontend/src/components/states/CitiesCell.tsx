import { useState } from "react";
import { ICity } from "../../types/city";
import { TextField, IconButton } from "@mui/material";
import { Add, Edit, Delete, Check, Close } from "@mui/icons-material";
import { useCreateCity } from "../../hooks/city/useCreateCity";
import useDeleteCity from "../../hooks/city/useDeleteCity";
import { useUpdateCityById } from "../../hooks/city/useUpdateCity";
import { Types } from "mongoose";
import useHasPermission from "../../hooks/auth/useHasPermission";

interface CitiesCellProps {
  stateId: string;
  cities: ICity[];
}

const CitiesCell: React.FC<CitiesCellProps> = ({ stateId, cities }) => {
  const [editingCity, setEditingCity] = useState<{
    cityId: string;
    name: string;
  } | null>(null);
  const [newCityName, setNewCityName] = useState<string>("");
  const [addingCity, setAddingCity] = useState<boolean>(false);

  const { mutate: onAddCity } = useCreateCity();
  const { handleDelete: onDeleteCity } = useDeleteCity();
  const { mutate: onEditCity } = useUpdateCityById();

  const hasCreatePermission = useHasPermission("create");
  const hasUpdatePermission = useHasPermission("update");
  const hasDeletePermission = useHasPermission("delete");

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
                  setEditingCity({ cityId: city._id.toString(), name: city.name })
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

      {addingCity ? (
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
                setAddingCity(false);
              }
            }}
          >
            <Check fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => setAddingCity(false)}>
            <Close fontSize="small" />
          </IconButton>
        </>
      ) : (
        <IconButton
          size="small"
          disabled={!hasCreatePermission}
          onClick={() => setAddingCity(true)}
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
};

export default CitiesCell;
