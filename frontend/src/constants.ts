export const PATHS = {
  LOCAL_HOST_5000: "http://localhost:5000",
  EDIT_PROFILE: "/edit-profile",
  STATE_FORM: "/state-form",
  SIGNIN:"/signin"
};
export const USER_PROPS = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  USER_NAME: "userName",
  EMAIL: "email",
  PHONE: "phone",
  LAST_UPDATED: "lastUpdated",
  PERMISSIONS: "permissions",
  ACTIONS: "actions",
  IMAGE: "profilePicture",
};
export const USER_PROPS_FORMAL = {
  FIRST_NAME: "First Name",
  LAST_NAME: "Last Name",
  USER_NAME: "User Name",
  EMAIL: "Email",
  PHONE: "Phone",
  LAST_UPDATED: "Last Updated",
  PERMISSIONS: "Permissions",
  ACTIONS: "Actions",
  IMAGE: "Profile Picture",
};
export const MESSAGE_PROPS_FORMAL = {
  USER_NAME: "User Name",
  ACTION_TYPE: "Action Type",
  DATE_OPEN: "Date Open",
  DATE_CLOSE: "Date Close",
  APPROVED: "Approved",
};
export const MESSAGE_PROPS = {
  USER_NAME: "username",
  ACTION_TYPE: "actionType",
  DATE_OPEN: "dateOpen",
  DATE_CLOSE: "dateClose",
  APPROVED: "approved",
};
export const ACTION_TYPES = {
  READ: "read",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
};
export const TOAST_MESSGAES = {
  ERROR: "Failed to fetch data",
};
export const ERROR = {
  NO_DATA: "No data available",
};
export const TITLES = {
  ADMIN_USER_MANAGEMENT: "Admin User Management",
  ADMIN_DASHBOARD: "Welcome To The Admin Dashboard",
};
export const PERMISSION_REQUEST_FORM = {
  TITLE: "Your current permissions:",
  NO_PERMISSIONS: "No permissions assigned yet.",
  SELECT: "Select Requested Permission",
  SUBMIT: "Request Permission",
};
export const ADMIN_SIDEBAR_TITLES = {
  USERS: "Manage users",
  REQUESTS: "Permissions Requests",
  EXIT: "Exit Dashboard",
};
export const ADMIN_SIDEBAR_VALUES = {
  USERS: "manageUsers",
  REQUESTS: "manageMessages",
};
export const CONFIRM_CANCEL_MODAL = {
  TITLE: "Are you sure you want to cancel?",
  SUBTITLE: "Your changes won't be saved.",
  BUTTONTEXT: "Yes, I want to go back",
};
export const CONFIRM_DELETE_MODAL = {
  TITLE: "Are you sure you want to delete?",
  SUBTITLE: "There's no way back",
  BUTTONTEXT: "Yes, Delete",
};
export const BASE_ACTIONS = {
  CANCEL: "Cancel",
};
export const YUP_ERRORS_STATE = {
  NAME: "Name is required",
  FLAG: "Flag URL is required",
  POPULATION_POSITIVE: "Population must be a positive number",
  POPULATION: "Population is required",
  REGION: "Region is required",
};
export const STATE_EDIT_CREATE = {
  UPDATE: "Update State",
  CREATE: "Create State",
  ADD_NEW: "Add New State",
};
export const STATE_PROPS_FORMAL = {
  NAME: "Name",
  FLAG: "Flag URL",
  POPULATION: "Population",
  REGION: "Region",
  CITIES: "Cities",
  ACTIONS: "Actions",
};
export const STATE_PROPS = {
  NAME: "name",
  FLAG: "flag",
  POPULATION: "population",
  REGION: "region",
  CITIES: "cities",
  ACTIONS: "actions",
};
export const REQUEST_PERMISSION = {
  NO_PERMISSION_ERROR: "You don't have permission to perform certain actions.",
  REQUEST_LINK: "Request Permission",
};
export const YUP_ERRORS_AUTH = {
  USER_NAME: "User Name is required",
  PASSWORD: "Password is required",
  EMAIL: "Email is required",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long",
  USER_NAME_MIN_LENGTH: "User Name must be at least 3 characters long",
  EMAIL_FORMAT: "Invalid email format",
};

export const FORGOT_PASSWORD = {
  TITLE: "Forgot Password",
  MESSAGE_AFTER_SEND:
    "If an account with that email exists, a password reset link has been sent.",
  SENDING: "Sending...",
  SUBMIT: "Send Reset Link",
};
export const RESET_PASSWORD = {
  TITLE: "Reset Password",
  MESSAGE_AFTER_SUCCESS: "Your password has been reset successfully.",
  SUBMIT: "Reset Password",

};