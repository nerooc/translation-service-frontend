import {useState} from "react";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {Tag} from "api/types";
import {TagCardProps} from "./types";
import {deleteTag} from "api/tags";
import {EditTagModal} from "../EditTagModal";
import {MainSection, StyledListItem, SettingsSection} from "./styles";


export const TagCard = ({tagData}: TagCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<Tag, unknown, number>({
    mutationFn: id => deleteTag(id),
    onSuccess: () => queryClient.invalidateQueries(['tags']),
  });

  const handleDeleteTag = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <StyledListItem key={tagData.id}>
      <MainSection>
        {tagData.name}
      </MainSection>
      <SettingsSection>
        <IconButton aria-label="delete" onClick={() => handleDeleteTag(tagData.id)}>
          <DeleteIcon fontSize="inherit"/>
        </IconButton>
        <IconButton aria-label="edit" onClick={() => setIsOpen(true)}>
          <EditIcon fontSize="inherit"/>
        </IconButton>
      </SettingsSection>

      <EditTagModal isOpen={isOpen} setIsOpen={setIsOpen} tagData={tagData}/>
    </StyledListItem>
  )
};
