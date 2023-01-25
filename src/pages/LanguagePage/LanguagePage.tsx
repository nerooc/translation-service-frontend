import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchLanguages } from "api/languages";
import { ResourcePage } from "components";
import { LanguageCard, CreateLanguageModal } from "./components";
import { StyledUnorderedList } from "./styles";
import { usePagination } from "hooks";

export const LanguagePage = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
  });
  const PER_PAGE = 20;

  const handlePageChange = (p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  const filteredData = useMemo(
    () =>
      data?.filter((language) => {
        return (
          language.name.toLowerCase().includes(searchPhrase.toLowerCase()) ||
          language.code.toLowerCase().includes(searchPhrase.toLowerCase())
        );
      }) || [],
    [data, searchPhrase]
  );

  const count = Math.ceil(filteredData.length / PER_PAGE);
  const _DATA = usePagination(filteredData, PER_PAGE);

  return (
    <ResourcePage
      title="Languages"
      page={page}
      searchBarPlaceholder="Search for language..."
      numberOfPages={count}
      onSearchPhraseChange={(v) => setSearchPhrase(v)}
      onAddItemClick={() => setIsOpen(true)}
      onPageChange={handlePageChange}
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
