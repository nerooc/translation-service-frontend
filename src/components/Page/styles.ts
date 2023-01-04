import { styled, Stack, Typography } from "@mui/material";

export const PageContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(4),
  paddingLeft: theme.spacing(6),
  paddingRight: theme.spacing(6),
  gap: theme.spacing(4),
}));

export const Header = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

export const Content = styled(Stack)(() => ({
  flex: 1,
}));

export const Footer = styled(Stack)(() => ({
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Title = styled(Typography)(() => ({
  fontSize: 32,
  fontWeight: 700,
}));
