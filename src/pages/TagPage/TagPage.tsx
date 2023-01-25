import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchTags } from "api/tags";
import { ResourcePage } from "components";
import { TagCard, CreateTagModal } from "./components";
import { StyledUnorderedList } from "./styles";
import { usePagination } from "hooks";

export const TagPage = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery({ queryKey: ["tags"], queryFn: fetchTags });
  const PER_PAGE = 20;

  const handlePageChange = (p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  const filteredData = useMemo(
    () =>
      data?.filter((tag) => {
        return tag.name.toLowerCase().includes(searchPhrase.toLowerCase());
      }) || [],
    [data, searchPhrase]
  );

  const count = Math.ceil(filteredData.length / PER_PAGE);
  const _DATA = usePagination(filteredData, PER_PAGE);

  return (
    <ResourcePage
      title="Tags"
      page={page}
      searchBarPlaceholder="Search for tag..."
      numberOfPages={count}
      onSearchPhraseChange={(v) => setSearchPhrase(v)}
      onAddItemClick={() => setIsOpen(true)}
      onPageChange={handlePageChange}
    >
      <StyledUnorderedList>
        {_DATA?.currentData().map((tag) => (
          <TagCard tagData={tag} key={`TagCard_${tag.id}`} />
        ))}
      </StyledUnorderedList>
      <CreateTagModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </ResourcePage>
  );
};
