import {useForm, Controller} from 'react-hook-form';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import TextField from "@mui/material/TextField";

import {Tag, TagUpdate} from "api/types";
import {updateTag} from "api/tags";
import {Modal} from "components";
import {useEffect} from "react";

type EditTagModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  tagData: Tag;
}

export const EditTagModal = ({isOpen, setIsOpen, tagData}: EditTagModalProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<TagUpdate>({defaultValues: {...tagData}});

  useEffect(() => {
    reset({...tagData});
  }, [tagData, reset]);

  const onSubmit = handleSubmit((data) => handleUpdateTag({...data, id: tagData.id}));

  const queryClient = useQueryClient();

  const updateMutation = useMutation<Tag, unknown, Tag>({
    mutationFn: tagData => updateTag(tagData.id, {name: tagData.name}),
    onSuccess: () => queryClient.invalidateQueries(['tags']),
  });

  const handleUpdateTag = (tagData: Tag) => {
    updateMutation.mutate(tagData);
  };


  return (
    <Modal title="Edit tag" isOpen={isOpen} onCancel={() => setIsOpen(false)} onSave={onSubmit}>
      <form>
        <Controller
          name={'name'}
          control={control}
          defaultValue={''}
          render={({field: {onChange, value}}) => (
            <TextField
              fullWidth
              onChange={onChange}
              value={value}
              label={"Name"}
              variant="standard"
              sx={{marginBottom: 2}}
            />
          )}
          rules={{required: true}}
        />
        {errors.name && <span>This field is required</span>}
      </form>
    </Modal>
  );
};
