import { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useQueries } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { Modal } from "components/Modal";
import { fetchLanguages } from "api/languages";
import { fetchTags } from "api/tags";

import type { MessageFiltersProps } from "./types";

export const MessageFiltersModal = ({
  title,
  filters,
  isOpen,
  onSubmit,
  onCancel,
}: MessageFiltersProps) => {
  const [{ data: languages }, { data: tags }] = useQueries({
    queries: [
      { queryKey: ["languages"], queryFn: fetchLanguages },
      { queryKey: ["tags"], queryFn: fetchTags },
    ],
  });
  const defaultFormValues = filters;

  const defaultValues = useMemo(() => ({ ...defaultFormValues }), []);

  const { handleSubmit, control, register, reset } = useForm({});

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const handleCloseForm = () => {
    onCancel();
  };

  const handleFilterReset = () => {
    onSubmit({
      searchPhrase: "",
      language: null,
      tags: [],
    });
    onCancel();
  };

  const handleFormSaved = handleSubmit((v: any) => {
    onSubmit(v);
  });

  const isLoading = !languages || !tags;

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onCancel={handleCloseForm}
      onSave={handleFormSaved}
      saveButtonLabel="Search"
    >
      {isLoading ? (
        <Stack justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      ) : (
        <Stack gap={2}>
          <TextField
            {...register("searchPhrase")}
            label="Search phrase"
            fullWidth
          />
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={languages}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                renderInput={(params) => (
                  <TextField {...params} label="Language" />
                )}
                onChange={(_, v) => field.onChange(v)}
                value={field.value}
              />
            )}
          />
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={tags}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                renderInput={(params) => <TextField {...params} label="Tags" />}
                onChange={(_, v) => field.onChange(v)}
                value={field.value}
              />
            )}
          />

          <Button variant="contained" onClick={handleFilterReset}>
            Reset filters
          </Button>
        </Stack>
      )}
    </Modal>
  );
};
