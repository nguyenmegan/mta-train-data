import { TableSort } from '../components/TableSort/TableSort';
import { HeaderSimple } from '../components/HeaderSimple/HeaderSimple';
import { FooterSimple } from '../components/FooterSimple/FooterSimple';
import { Container } from '@mantine/core';
import { Title, Text } from '@mantine/core';

export default function Explorer() {
    return (
        <>
            <HeaderSimple />
            <Container px={0} size="80rem">
                <Title ta="center" mb={30}>
                    <Text inherit component="span">
                        Data Explorer
                    </Text>
                </Title>
                <TableSort />
            </Container>
            <FooterSimple />
        </>
    );
}
