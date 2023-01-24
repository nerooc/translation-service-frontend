import {useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {fetchLanguages} from "api/languages";
import {ResourcePage} from "components";
import {LanguageCard, CreateLanguageModal} from "./components";
import {StyledUnorderedList} from "./styles";


export const LanguagePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {data} = useQuery({queryKey: ['languages'], queryFn: fetchLanguages});

  return (
    <ResourcePage
      title="Languages"
      searchBarPlaceholder="Search for language..."
      numberOfPages={10}
      onSearchPhraseChange={(v) => console.log('Search languages:', v)}
      onAddItemClick={() => setIsOpen(true)}
      onPageChange={(page) => console.log('Load languages page', page)}
    >
      <StyledUnorderedList>
        {data?.map(language => (
          <LanguageCard languageData={language} key={`LanguageCard_${language.id}`}/>
        ))}
      </StyledUnorderedList>
      <CreateLanguageModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </ResourcePage>
  );
};