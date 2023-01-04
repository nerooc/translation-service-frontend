import type { PageProps } from './types';
import {PageContainer, Header, Content, Footer, Title} from './styles';

export const Page = ({
  title,
  children, 
  headerRightElement,
  footer,
}: PageProps) => {
  return (
    <PageContainer>
      <Header>
        <Title variant='h1'>{title}</Title>
        {headerRightElement}
      </Header>
      <Content>
        {children}
      </Content>
      <Footer>
        {footer}
      </Footer>
    </PageContainer>
  );
};
