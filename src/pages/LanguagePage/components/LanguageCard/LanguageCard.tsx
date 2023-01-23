import {useState} from "react";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {Language} from "api/types";
import {deleteLanguage} from "../../../../api/languages";
import {EditLanguageModal} from "../EditLanguageModal";
import {MainSection, StyledListItem, SettingsSection} from "./styles";

type LanguageCardProps = {
  languageData: Language
};

export const LanguageCard = ({languageData}: LanguageCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<Language, unknown, number>({
    mutationFn: id => deleteLanguage(id),
    onSuccess: () => queryClient.invalidateQueries(['languages']),
  });

  const handleDeleteLanguage = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <StyledListItem key={languageData.id}>
      <MainSection>
        {languageData.name}
        <br/>
        <text style={{fontWeight: "bold"}}>{languageData.code}</text>
      </MainSection>
      <SettingsSection>
        <IconButton aria-label="delete">
          <DeleteIcon fontSize="inherit" onClick={() => handleDeleteLanguage(languageData.id)}/>
        </IconButton>
        <IconButton aria-label="edit" onClick={() => setIsOpen(true)}>
          <EditIcon fontSize="inherit"/>
        </IconButton>
      </SettingsSection>

      <EditLanguageModal isOpen={isOpen} setIsOpen={setIsOpen} languageData={languageData}/>
    </StyledListItem>
  )
};
