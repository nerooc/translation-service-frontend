import {useForm, Controller} from 'react-hook-form';
import {useMutation, useQueryClient} from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import {Language, LanguageUpdate} from "../../../../api/types";
import {Modal} from "components";
import {updateLanguage} from "../../../../api/languages";

type EditLanguageModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  languageData: Language;
}

export const EditLanguageModal = ({isOpen, setIsOpen, languageData}: EditLanguageModalProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<LanguageUpdate>({defaultValues: {...languageData}});
  const onSubmit = handleSubmit((data) => handleUpdateLanguage({...data, id: languageData.id}));

  const queryClient = useQueryClient();

  const updateMutation = useMutation<Language, unknown, Language>({
    mutationFn: languageData => updateLanguage(languageData.id, {name: languageData.name, code: languageData.code}),
    onSuccess: () => queryClient.invalidateQueries(['languages']).then(() => reset()),
  });

  const handleUpdateLanguage = (languageData: Language) => {
    updateMutation.mutate(languageData);
  };


  return (
    <Modal title="Edit language" isOpen={isOpen} onCancel={() => setIsOpen(false)} onSave={onSubmit}>
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
