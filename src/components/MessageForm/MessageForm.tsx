import { Message } from 'api/types';
import React, {useEffect} from 'react';
import { useForm, Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { Modal } from 'components/Modal';
import { ModalProps } from 'components/Modal/types';

export type MessageFormProps = {
  message?: Partial<Omit<Message, 'id'>>;
  onSubmit(data: Omit<Message, 'id'>): void;
} & Omit<ModalProps, 'onSave' | 'children'>

const languages = [
  {id: 1, code: 'EN', name: 'English'},
  {id: 2, code: 'DE', name: 'German'},
  {id: 3, code: 'PL', name: 'Polish'},
]

const tags = [
  {id: 1, name: 'Tag1'},
  {id: 2, name: 'Dupa'},
  {id: 3, name: 'Kupa'},
]


const defaultFormValues: Omit<Message, 'id'> = {
  originalMessage: null,
  content: '',
  language: languages[0],
  tags: [],
}

const originalMessages = [
  {id: 1, originalMessage: null, content: 'Jebac', language: {id: 1, code: 'EN', name: 'English'}, tags: []},
  {id: 2, originalMessage: null, content: 'Studia', language: {id: 1, code: 'EN', name: 'English'}, tags: []},
  {id: 3, originalMessage: null, content: 'Bez gumy', language: {id: 1, code: 'EN', name: 'English'}, tags: []},
]

export const MessageForm = ({title, isOpen, message, onSubmit, onCancel}: MessageFormProps) => {
  const defaultValues = { ...defaultFormValues, ...message};
  console.log({defaultValues});
  const {handleSubmit, control, register, reset} = useForm({defaultValues});

  useEffect(() => {
    reset(defaultValues);
  }, [message, reset]);

  const handleCloseForm = () => {
    reset();
    onCancel();
  }

  const handleFormSaved = handleSubmit((v) => {
    onSubmit(v)
    handleCloseForm();
  });

  return (
    <Modal title={title} isOpen={isOpen} onCancel={handleCloseForm} onSave={handleFormSaved}>
      <Stack gap={2}>
        <Controller
          name="originalMessage"
          control={control}
          render={({ field }) => (
            <Autocomplete
              defaultValue={null}
              options={originalMessages}
              getOptionLabel={(option) => option.content}
              renderInput={(params) => <TextField {...params} label="Original Message" />}
              onChange={(_, v) => field.onChange(v?.id)}
              value={originalMessages.find(m => m.id === field.value)}
            />
          )}
        />
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <Autocomplete
              options={languages}
              getOptionLabel={(option) => option.name}
              onReset={() => field.onChange(null)}
              renderInput={(params) => <TextField {...params} label="Language" />}
              onChange={(_, v) => field.onChange(v)}
              value={field.value}
            />
          )}
        />
        <TextField label="Content" multiline rows={5} inputProps={{...register('content')}} />
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple
              options={tags}
              getOptionLabel={(option) => option.name}
              onReset={() => field.onChange(null)}
              renderInput={(params) => <TextField {...params} label="Tags" />}
              onChange={(_, v) => field.onChange(v)}
              value={field.value}
            />
          )}
        />
      </Stack>
    </Modal>
  )
}
