import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchTags } from "api/tags";
import { ResourcePage } from "components";
import { TagCard, CreateTagModal } from "./components";
import { StyledUnorderedList } from "./styles";

export const TagPage = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery({ queryKey: ["tags"], queryFn: fetchTags });

  const filteredData = useMemo(
    () =>
      data?.filter((tag) => {
        return tag.name.toLowerCase().includes(searchPhrase.toLowerCase());
      }),
    [data, searchPhrase]
  );

  return (
    <ResourcePage
      title="Tags"
      searchBarPlaceholder="Search for tag..."
      numberOfPages={10}
      onSearchPhraseChange={(v) => setSearchPhrase(v)}
      onAddItemClick={() => setIsOpen(true)}
      onPageChange={(page) => console.log("Load tags page", page)}
    >
      <StyledUnorderedList>
        {filteredData?.map((tag) => (
          <TagCard tagData={tag} key={`TagCard_${tag.id}`} />
        ))}
      </StyledUnorderedList>
      <CreateTagModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </ResourcePage>
  );
};
