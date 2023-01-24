import {useEffect, useMemo} from 'react';

import { useForm, Controller } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useQueries } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';

import { Modal } from 'components/Modal';
import { fetchOriginalMessages } from 'api/messages';
import { fetchLanguages } from 'api/languages';
import { fetchTags } from 'api/tags';
import type { Message } from 'api/types';

import type { MessageFormProps } from './types';

const defaultFormValues: Omit<Message, 'id'> = {
  originalMessage: null,
  content: '',
  // Just a workaround to get rid off typescript complaints
  language: {id: 1, code: 'EN', name: 'English'}, 
  tags: [],
}

export const MessageForm = ({ title, isOpen, message, onSubmit, onCancel }: MessageFormProps) => {
  const defaultValues = useMemo(() => ({ ...defaultFormValues, ...message}), [message]);

  const [
    {data: originalMessages}, 
    {data: languages}, 
    {data: tags}
  ] = useQueries({
    queries: [
      { queryKey: ['messages', 'original'], queryFn: fetchOriginalMessages },
      { queryKey: ['languages'], queryFn: fetchLanguages },
      { queryKey: ['tags'], queryFn: fetchTags },
    ]
  });

  const { handleSubmit, control, register, reset, setValue } = useForm({defaultValues});

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (languages) {
      const english = languages.find(language => language.name === 'English');
      // We are sure that english will exist because backends add it on launch
      setValue('language', english!);
    }
  }, [languages, setValue]);

  const handleCloseForm = () => {
    reset();
    onCancel();
  }

  const handleFormSaved = handleSubmit((v) => {
    onSubmit(v)
    handleCloseForm();
  });

  const isLoading = !originalMessages || !languages || !tags;

  return (
    <Modal title={title} isOpen={isOpen} onCancel={handleCloseForm} onSave={handleFormSaved}>
      {isLoading ? (
        <Stack justifyContent="center" alignItems="center">
          <CircularProgress />
        </Stack>
      ): (
        <Stack gap={2}>
          <Controller
            name="originalMessage"
            control={control}
            render={({ field }) => (
              <Autocomplete
                freeSolo
                defaultValue={null}
                options={originalMessages.map(message => message.content)}
                getOptionLabel={(option) => option}
                onReset={() => field.onChange(null)}
                renderInput={(params) => <TextField {...params} label="Original Message" />}
                onChange={(_, value) => field.onChange(value)}
                value={field.value}
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
                isOptionEqualToValue={(option, value) => option.name === value.name}
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
                isOptionEqualToValue={(option, value) => option.name === value.name}
                renderInput={(params) => <TextField {...params} label="Tags" />}
                onChange={(_, v) => field.onChange(v)}
                value={field.value}
              />
            )}
          />
        </Stack>
      )}
    </Modal>
  )
}
