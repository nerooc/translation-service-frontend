import {useForm, Controller} from 'react-hook-form';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import {Language, LanguageCreateData, LanguageUpdate} from "../../../../api/types";
import {Modal} from "components";
import {createLanguage} from "../../../../api/languages";

type CreateLanguageModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CreateLanguageModal = ({isOpen, setIsOpen}: CreateLanguageModalProps) => {
  const {control, handleSubmit, formState: {errors}, reset} = useForm<LanguageUpdate>();
  const onSubmit = handleSubmit((languageData) => handleCreateLanguage(languageData));

  const queryClient = useQueryClient();

  const createMutation = useMutation<Language, unknown, LanguageCreateData>({
    mutationFn: languageData => createLanguage(languageData),
    onSuccess: () => queryClient.invalidateQueries(['languages']).then(() => reset())
    ,
  });
  const handleCreateLanguage = (languageData: LanguageCreateData) => {
    createMutation.mutate(languageData);

  };

  return (
    <Modal title="Create language" isOpen={isOpen} onCancel={() => setIsOpen(false)} onSave={onSubmit}>
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
        <br/>
        <Controller
          name={'code'}
          control={control}
          defaultValue={''}
          render={({field: {onChange, value}}) => (
            <TextField
              fullWidth
              onChange={onChange}
              value={value}
              label={"Code"}
              variant="standard"
            />
          )}
          rules={{required: true}}
        />
        {errors.code && <span>This field is required</span>}
      </form>
    </Modal>
  );
};
