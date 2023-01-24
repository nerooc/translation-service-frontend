import {useForm, Controller} from 'react-hook-form';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import TextField from "@mui/material/TextField";

import {Modal} from "components";
import {Tag, TagCreateData, TagUpdate} from "api/types";
import {createTag} from "api/tags";

type CreateTagModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CreateTagModal = ({isOpen, setIsOpen}: CreateTagModalProps) => {
  const {control, handleSubmit, formState: {errors}, reset} = useForm<TagUpdate>();
  const onSubmit = handleSubmit((tagData) => handleCreateTag(tagData));

  const queryClient = useQueryClient();

  const createMutation = useMutation<Tag, unknown, TagCreateData>({
    mutationFn: tagData => createTag(tagData),
    onSuccess: () => queryClient.invalidateQueries(['tags']).then(() => reset()),
  });
  const handleCreateTag = (tagData: TagCreateData) => {
    createMutation.mutate(tagData);

  };

  return (
    <Modal title="Create tag" isOpen={isOpen} onCancel={() => setIsOpen(false)} onSave={onSubmit}>
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
