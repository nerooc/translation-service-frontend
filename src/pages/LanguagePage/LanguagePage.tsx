import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchLanguages } from "api/languages";
import { ResourcePage } from "components";
import { LanguageCard, CreateLanguageModal } from "./components";
import { StyledUnorderedList } from "./styles";

export const LanguagePage = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
  });

  const filteredData = useMemo(
    () =>
      data?.filter((language) => {
        return (
          language.name.toLowerCase().includes(searchPhrase.toLowerCase()) ||
          language.code.toLowerCase().includes(searchPhrase.toLowerCase())
        );
      }),
    [data, searchPhrase]
  );

  return (
    <ResourcePage
      title="Languages"
      searchBarPlaceholder="Search for language..."
      numberOfPages={10}
      onSearchPhraseChange={(v) => setSearchPhrase(v)}
      onAddItemClick={() => setIsOpen(true)}
      onPageChange={(page) => console.log("Load languages page", page)}
    >
      <StyledUnorderedList>
        {filteredData?.map((language) => (
          <LanguageCard
            languageData={language}
            key={`LanguageCard_${language.id}`}
          />
        ))}
      </StyledUnorderedList>
      <CreateLanguageModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </ResourcePage>
  );
};
