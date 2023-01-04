import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createLanguage, deleteLanguage, fetchLanguages } from "api/languages";
import { Language, LanguageCreateData } from "api/types";
import { ResourcePage } from "components";

type LanguagePageProps = {};

export const LanguagePage = (props: LanguagePageProps) => {
  // Just some random code to give an working example of Mock Service Worker, delete while implementing task for this page
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

  const handleCreateLanguage = () => {
    createMutation.mutate({name: 'Polskaaa', code: 'PL'});
  };

  const handleDeleteLanguage = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <ResourcePage
      title="Languages"
      searchBarPlaceholder="Search for language..."
      numberOfPages={10}
      onSearchPhraseChange={(v) => console.log('Search languages:', v)}
      onAddItemClick={handleCreateLanguage}
      onPageChange={(page) => console.log('Load languages page', page)}
    >
      <ul>
        {data?.map(language => (
          <li key={language.id}>
            {language.name} ({language.code})
            <button onClick={() => handleDeleteLanguage(language.id)}>delete x</button>
          </li>
        ))}
      </ul>
    </ResourcePage>
  );
};
      