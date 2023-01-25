import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/EditOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Language } from "api/types";
import { LanguageCardProps } from "./types";
import { deleteLanguage } from "api/languages";
import { EditLanguageModal } from "../EditLanguageModal";
import { MainSection, StyledListItem, SettingsSection } from "./styles";

export const LanguageCard = ({ languageData }: LanguageCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<Language, unknown, number>({
    mutationFn: (id) => deleteLanguage(id),
    onSuccess: () => queryClient.invalidateQueries(["languages"]),
  });

  const handleDeleteLanguage = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <StyledListItem key={languageData.id}>
      <MainSection>
        {languageData.name}
        <br />
        <b>{languageData.code}</b>
      </MainSection>
      <SettingsSection>
        <IconButton
          aria-label="delete"
          onClick={() => handleDeleteLanguage(languageData.id)}
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="edit" onClick={() => setIsOpen(true)}>
          <EditIcon fontSize="inherit" />
        </IconButton>
      </SettingsSection>

      <EditLanguageModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        languageData={languageData}
      />
    </StyledListItem>
  );
};
