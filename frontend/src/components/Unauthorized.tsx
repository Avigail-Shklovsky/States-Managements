import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";

const Unauthorized = () => {
  return (
    <div className="container">
        <div className="form wrapper">
      <Typography variant="h3" color="error" fontWeight="bold">
        Access Denied
      </Typography>
      <Typography variant="h6" className="mt-4">
        You do not have permission to view this page.
      </Typography>
      <Button 
        component={Link} 
        to="/" 
        variant="contained" 
        color="primary" 
        className="mt-6"
      >
        Go Back Home
      </Button>
      </div>
      </div>
  );
};

export default Unauthorized;
