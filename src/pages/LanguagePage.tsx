import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLanguage, deleteLanguage, fetchLanguages } from "api/languages";
import { Language, LanguageCreateData } from "api/types";

type LanguagePageProps = {};

export const LanguagePage = (props: LanguagePageProps) => {
  const queryClient = useQueryClient();
  const {data} = useQuery({queryKey: ['languages'], queryFn: fetchLanguages});
  const createMutation = useMutation<Language, unknown, LanguageCreateData>({
    mutationFn: languageData => createLanguage(languageData),
    onSuccess: () => queryClient.invalidateQueries(['languages']),
  });
  const deleteMutation = useMutation<Language, unknown, number>({
    mutationFn: id => deleteLanguage(id),
    onSuccess: () => queryClient.invalidateQueries(['languages']),
  });

  const handleCreateLanguage = async () => {
    createMutation.mutate({name: 'Polskaaa', code: 'PL'});
  };

  const handleDeleteLanguage = async (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      <h1>Languages</h1>
      <ul>
        {data?.map(language => (
          <li key={language.id}>
            {language.name} ({language.code})
            <button onClick={() => handleDeleteLanguage(language.id)}>delete x</button>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateLanguage}>Add new</button>
    </div>
  );
};
