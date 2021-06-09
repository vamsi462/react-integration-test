import { Box, Button, TextField } from "@material-ui/core";
import React, { useCallback, useState } from "react";

export const LoginForm = ({ onSubmit, isLoading }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = useCallback(
    (event) => {
      const target = event.target;
      setForm({ ...form, [target.name]: target.value });
    },
    [form]
  );
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(form);
    },
    [form, onSubmit]
  );
  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Box m={1}>
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          onChange={handleInputChange}
          value={form.email}
        />
      </Box>
      <Box m={1}>
        <TextField
          id="password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          onChange={handleInputChange}
          value={form.password}
        />
      </Box>
      <Box m={1}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading" : "Submit"}
        </Button>
      </Box>
    </form>
  );
};
