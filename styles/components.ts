import { Components, Theme } from "@mui/material";

export const components = (): Components<Omit<Theme, "components">> => ({
  MuiTextField: {
    defaultProps: {
      size: 'small',
    },
  },
});
