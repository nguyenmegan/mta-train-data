import { TableSort } from '../../components/TableSort/TableSort';
import { HeaderSimple } from '../../components/HeaderSimple/HeaderSimple';
import { Container } from '@mantine/core';
import { Title, Text } from '@mantine/core';

export default function Explorer() {
    return (
        <>
            <HeaderSimple />
            <Container px={0} size="80rem">
                <Title ta="center" mt={100}>
                    <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
                        Data Explorer
                    </Text>
                </Title>
                <TableSort />
            </Container>
        </>
    );
}
