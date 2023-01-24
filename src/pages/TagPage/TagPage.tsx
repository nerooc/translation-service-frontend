import {useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {fetchTags} from "api/tags";
import {ResourcePage} from "components";
import {TagCard, CreateTagModal} from "./components";
import {StyledUnorderedList} from "./styles";


export const TagPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {data} = useQuery({queryKey: ['tags'], queryFn: fetchTags});

  return (
    <ResourcePage
      title="Tags"
      searchBarPlaceholder="Search for tag..."
      numberOfPages={10}
      onSearchPhraseChange={(v) => console.log('Search tags:', v)}
      onAddItemClick={() => setIsOpen(true)}
      onPageChange={(page) => console.log('Load tags page', page)}
    >
      <StyledUnorderedList>
        {data?.map(tag => (
          <TagCard tagData={tag} key={`TagCard_${tag.id}`}/>
        ))}
      </StyledUnorderedList>
      <CreateTagModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </ResourcePage>
  );
};