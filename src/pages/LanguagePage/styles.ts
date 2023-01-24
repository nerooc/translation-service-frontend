import { styled } from "@mui/material";

export const StyledUnorderedList = styled('ul')(({theme}) => ({
    display: 'grid',
    gridGap: '10px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr) )',
}));
