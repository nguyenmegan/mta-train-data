import { Title, Text, Container } from '@mantine/core';
import { HeaderSimple } from '../../components/HeaderSimple/HeaderSimple';
import AboutBlog from '../../components/AboutBlog/AboutBlog';

export default function Explorer() {
    return (
        <>
            <HeaderSimple />
            <Container px={0} size="80rem">
                <Title ta="center" mt={100}>
                    <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                        About
                    </Text>
                </Title>
                <AboutBlog />
            </Container>
        </>
    );
}
