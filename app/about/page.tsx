import { Title, Text, Container } from '@mantine/core';
import { HeaderSimple } from '../../components/HeaderSimple/HeaderSimple';
import AboutBlog from '../../components/AboutBlog/AboutBlog';
import { FooterSimple } from '../../components/FooterSimple/FooterSimple';

export default function Explorer() {
    return (
        <>
            <HeaderSimple />
            <Container px={0} size="80rem">
                <Title ta="center" mb={30}>
                    <Text inherit component="span">
                        About
                    </Text>
                </Title>
                <AboutBlog />
            </Container>
            <FooterSimple />
        </>
    );
}
